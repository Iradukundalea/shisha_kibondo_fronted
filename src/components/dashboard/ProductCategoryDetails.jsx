import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems, thirdListItems } from './listItems';
import Chart from './Chart';
import Orders from './Orders';
import Copyright from '../copyright';
import { useSelector, useDispatch } from 'react-redux'
import { getAdvisors } from '../../redux/actions/AdvisorActions'
import Loading from './Loading'
import AddAdvisor from './AddAdvisor'
import { formattedTimestamp } from '../../utils/formatTime';
import Input from '@mui/material/Input';
import { getProductCategoryDetails } from '../../redux/actions/ProductActions';
import { Link, useParams } from 'react-router-dom'
import { TextField } from '@mui/material';
import { addProductQuantityInStock } from '../../redux/actions/StockActions'
import {getCurrentUser} from '../../utils/getCurrentUser'
import { CSVLink, CSVDownload } from "react-csv";
import { PDFDownloadLink, Page, Text, Document } from '@react-pdf/renderer';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import FAB from '../../assets/logo.jfif'

function preventDefault(event) {
  event.preventDefault();
}

const getCSVData = (productCategory, transactions) => {
  const csvData = [];

  // Prepare the header row
  csvData.push([
    'PRODUCT NAME',
    'BENEFICIAL',
    'QUANTITY',
    'DATE',
  ]);

  // Iterate through transactions and add data
  transactions?.forEach((transaction) => {
    const productName = productCategory?.name;

    let beneficialInfo = '-';
    if (transaction?.beneficial) {
      beneficialInfo = `${transaction.beneficial.firstName} ${transaction.beneficial.lastName}`;
    }

    const quantity = transaction.quantity;

    let date = '-';
    if (transaction?.createdAt) {
       date = new Date(transaction.createdAt).toLocaleDateString();
    }

    if(transaction?.beneficial){
        csvData.push([productName, beneficialInfo, quantity, date]);
    }
  });

  return csvData;
};

const generatePDF = (data, user) => {
  const doc = new jsPDF();

  const x_position = 20;     // X-coordinate where the logo starts
  const y_position = 10;     // Y-coordinate where the logo starts
  const logoWidth = 50;      // Width of the logo
  const logoHeight = 40;     // Height of the logo

  // Get the width of the PDF page
  const pageWidth = doc.internal.pageSize.getWidth();
  

  // Adding LOGO
  const imgData = FAB; 
  
  doc.addImage(imgData, 'jpg', x_position, y_position, logoWidth, logoHeight);

  // Add company address
  const companyAddressLines = [
    'UMUGI WA KIGARI',
    'AKARERE KA GASABO',
    'IKIGO NDERABUZIMA CYA REMERA',
    'TEL: 0782264752',
    'Email: csremera@gmail.com',
  ];
  
  const lineHeight = 7; // Adjust the line height as needed
  
  doc.setFontSize(10);
  companyAddressLines.forEach((line, index) => {
    doc.text(line, x_position, y_position + 10 + logoHeight + (index * lineHeight));
  });


  // Add Report title
  const reportTitle = `Shishakibondo Donation Report`
  const titleFontSize = 16;
  // Calculate title size
  const titleWidth = doc.getStringUnitWidth(reportTitle) * titleFontSize / doc.internal.scaleFactor;

  // Calculate the x-coordinate to center the title
  const titleXPosition = (pageWidth - titleWidth) / 2;
  const titleYPosition = y_position + logoHeight + 40;

  // Underline the report title
  const underlineYPosition = titleYPosition + 2;
  
  doc.setFontSize(titleFontSize);
  doc.text(reportTitle, titleXPosition, titleYPosition)

  // Draw a line under the title
  doc.setLineWidth(0.5); // Adjust the line thickness if needed
  doc.line(titleXPosition, underlineYPosition, titleXPosition + titleWidth, underlineYPosition);



  // Calculate the Y-coordinate for the table starting position
  const tableYPosition = y_position + logoHeight + 45; // Adjust spacing as needed


  // Add footer with printed date
  var printedDate = new Date().toLocaleString();
  var footerText = `Printed On: ` + printedDate;

  var pageCount = doc.internal.getNumberOfPages();
  for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(100, doc.internal.pageSize.getHeight() - 10, footerText);
  }

  const header = ['BENEFICIAL', 'CELL', 'VILLAGE', 'QUANTITY RECEIVED', 'DONATION DATE'];
  const filteredData = data.filter(transaction => transaction.beneficial);
  const rows = filteredData.map((transaction) =>[
      transaction?.beneficial
        ? `${transaction.beneficial.firstName} ${transaction.beneficial.lastName}`
        : '-',
      transaction?.beneficial
        ? `${transaction.beneficial.cell}`
        : '-',
      transaction?.beneficial
        ? `${transaction.beneficial.village}`
        : '-',
      transaction.quantity,
      transaction?.createdAt
        ? new Date(transaction?.createdAt).toLocaleDateString()
        : '-',
    ]);

  doc.autoTable({
    head: [header],
    body: rows,
    startY: tableYPosition
  });

  doc.save('shishakibondo_donation_report.pdf');
};

const generatePDFByCell = (data, cell) => {            
  const doc = new jsPDF();

  const x_position = 20;     // X-coordinate where the logo starts
  const y_position = 10;     // Y-coordinate where the logo starts
  const logoWidth = 50;      // Width of the logo
  const logoHeight = 40;     // Height of the logo

  // Get the width of the PDF page
  const pageWidth = doc.internal.pageSize.getWidth();

  // Adding LOGO
  const imgData = FAB; 
  
  doc.addImage(imgData, 'jfif', x_position, y_position, logoWidth, logoHeight);

  // Add company address
  const companyAddressLines = [
    'UMUGI WA KIGARI',
    'AKARERE KA GASABO',
    'IKIGO NDERABUZIMA CYA REMERA',
    'TEL: 0782264752',
    'Email: csremera@gmail.com',
  ];
  
  const lineHeight = 7; // Adjust the line height as needed
  
  doc.setFontSize(10);
  companyAddressLines.forEach((line, index) => {
    doc.text(line, x_position, y_position + 10 + logoHeight + (index * lineHeight));
  });


  // Add Report title
  const reportTitle = `Shishakibondo Donation Report`
  const titleFontSize = 16;
  // Calculate title size
  const titleWidth = doc.getStringUnitWidth(reportTitle) * titleFontSize / doc.internal.scaleFactor;

  // Calculate the x-coordinate to center the title
  const titleXPosition = (pageWidth - titleWidth) / 2;
  const titleYPosition = y_position + logoHeight + 40;

  // Underline the report title
  const underlineYPosition = titleYPosition + 12;
  
  doc.setFontSize(titleFontSize);
  doc.text(reportTitle, titleXPosition, titleYPosition)

  // Draw a line under the title
  doc.setLineWidth(0.5); // Adjust the line thickness if needed
  doc.line(titleXPosition, underlineYPosition, titleXPosition + titleWidth, underlineYPosition);

  // Calculate the Y-coordinate for the table starting position
  const tableYPosition = y_position + logoHeight + 45; // Adjust spacing as needed

  // Add footer with printed date
  var printedDate = new Date().toLocaleString();
  var footerText = `Printed On: ` + printedDate;

  var pageCount = doc.internal.getNumberOfPages();
  for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(100, doc.internal.pageSize.getHeight() - 10, footerText);
  }

  const header = ['BENEFICIAL', 'CELL', 'VILLAGE', 'QUANTITY RECEIVED', 'DONATION DATE'];
  const filteredData = data.filter((transaction) => transaction.beneficial && transaction.beneficial.cell === cell);
  if (filteredData.length === 0) {
    // Add a row indicating no matching data
    const noMatchRow = ['', '', '- No matching data -', '', ''];
    doc.autoTable({
      head: [header],
      body: [noMatchRow],
      startY: tableYPosition,
      colSpan: { 0: 5 }, // Span across all columns
      styles: { cellWidth: 'wrap' }, // Allow cell to wrap content
    });
  } else {
    const rows = filteredData.map((transaction) =>[
      transaction?.beneficial
        ? `${transaction.beneficial.firstName} ${transaction.beneficial.lastName}`
        : '-',
      transaction?.beneficial
        ? `${transaction.beneficial.cell}`
        : '-',
      transaction?.beneficial
        ? `${transaction.beneficial.village}`
        : '-',
      transaction.quantity,
      transaction?.createdAt
        ? new Date(transaction?.createdAt).toLocaleDateString()
        : '-',
    ]);
    doc.autoTable({
      head: [header],
      body: rows,
      startY: tableYPosition
    });
}
  doc.save('shishakibondo_donation_report.pdf');
};

const generatePDFByVillage = (data, village) => {
  const doc = new jsPDF();

  const x_position = 20;     // X-coordinate where the logo starts
  const y_position = 10;     // Y-coordinate where the logo starts
  const logoWidth = 50;      // Width of the logo
  const logoHeight = 40;     // Height of the logo

  // Get the width of the PDF page
  const pageWidth = doc.internal.pageSize.getWidth();

  // Adding LOGO
  const imgData = FAB; 
  
  doc.addImage(imgData, 'jpg', x_position, y_position, logoWidth, logoHeight);

  // Add company address
  const companyAddressLines = [
    'UMUGI WA KIGARI',
    'AKARERE KA GASABO',
    'IKIGO NDERABUZIMA CYA REMERA',
    'TEL: 0782264752',
    'Email: csremera@gmail.com',
  ];
  
  const lineHeight = 7; // Adjust the line height as needed
  
  doc.setFontSize(10);
  companyAddressLines.forEach((line, index) => {
    doc.text(line, x_position, y_position + 10 + logoHeight + (index * lineHeight));
  });


  // Add Report title
  const reportTitle = `Shishakibondo Donation Report`
  const titleFontSize = 16;
  // Calculate title size
  const titleWidth = doc.getStringUnitWidth(reportTitle) * titleFontSize / doc.internal.scaleFactor;

  // Calculate the x-coordinate to center the title
  const titleXPosition = (pageWidth - titleWidth) / 2;
  const titleYPosition = y_position + logoHeight + 40;

  // Underline the report title
  const underlineYPosition = titleYPosition + 2;
  
  doc.setFontSize(titleFontSize);
  doc.text(reportTitle, titleXPosition, titleYPosition)

  // Draw a line under the title
  doc.setLineWidth(0.5); // Adjust the line thickness if needed
  doc.line(titleXPosition, underlineYPosition, titleXPosition + titleWidth, underlineYPosition);

  // Calculate the Y-coordinate for the table starting position
  const tableYPosition = y_position + logoHeight + 45; // Adjust spacing as needed

  // Add footer with printed date
  var printedDate = new Date().toLocaleString();
  var footerText = `Printed On: ` + printedDate;

  var pageCount = doc.internal.getNumberOfPages();
  for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(100, doc.internal.pageSize.getHeight() - 10, footerText);
  }

  const header = ['BENEFICIAL', 'CELL', 'VILLAGE', 'QUANTITY RECEIVED', 'DONATION DATE'];
  const filteredData = data.filter((transaction) => transaction.beneficial && transaction.beneficial.village === village);
  if (filteredData.length === 0) {
    // Add a row indicating no matching data
    const noMatchRow = ['', '', '- No matching data -', '', ''];
    doc.autoTable({
      head: [header],
      body: [noMatchRow],
      startY: tableYPosition,
      colSpan: { 0: 5 }, // Span across all columns
      styles: { cellWidth: 'wrap' }, // Allow cell to wrap content
    });
  } else {
    const rows = filteredData.map((transaction) =>[
      transaction?.beneficial
        ? `${transaction.beneficial.firstName} ${transaction.beneficial.lastName}`
        : '-',
      transaction?.beneficial
        ? `${transaction.beneficial.cell}`
        : '-',
      transaction?.beneficial
        ? `${transaction.beneficial.village}`
        : '-',
      transaction.quantity,
      transaction?.createdAt
        ? new Date(transaction?.createdAt).toLocaleDateString()
        : '-',
    ]);
    doc.autoTable({
      head: [header],
      body: rows,
      startY: tableYPosition
    });
}
  doc.save('shishakibondo_donation_report.pdf');
};


export default function Advisor() {
  const { productCategoryId } = useParams()
  const dispatch = useDispatch()
  const [showAddProductQuantityForm, setShowAddProductQuantityForm] = React.useState(false)
  const [quantity, setQuantity] = React.useState('')
  const [expirationDate, setExpirationDate] = React.useState('')
  const [currentUser, setCurrentUser] = React.useState('')
  const [showCellInput, setShowCellInput] = React.useState(false)
  const [showVillageInput, setShowVillageInput] = React.useState(false)
  const [cell, setCell] = React.useState('')
  const [village, setVillage] = React.useState('')

  const { productCategory, loading, isProductQuantityUpdated } = useSelector(
    ({
      productState: { productCategory },
      stock: { loading, isProductQuantityUpdated}
    }) => ({
        productCategory,
        loading,
        isProductQuantityUpdated
    })
  );

  React.useEffect(()=>{
    setCurrentUser(getCurrentUser())

    dispatch(getProductCategoryDetails(productCategoryId))

    if(isProductQuantityUpdated){
      isShowAddProductQuantityForm(false)
    }
  },[isProductQuantityUpdated])

  const clearAddProductQuantityForm = ()=>{
    setQuantity('')
    setExpirationDate('')
  }

  const isShowAddProductQuantityForm =(value)=>{
    if(value){
      clearAddProductQuantityForm()
    }
    setShowAddProductQuantityForm(value)
  }

  const handleAddProductQuantity = (event)=>{
    preventDefault(event)
    const data = {
      productCategoryId,
      quantity,
      expirationDate
    }
    dispatch(addProductQuantityInStock(data))
  }

  const printCellPDFHandler = (e) =>{
    e.preventDefault()
    generatePDFByCell(productCategory?.transactions, cell)
  }

  const printVillagePDFHandler = (e) =>{
    e.preventDefault()
    generatePDFByVillage(productCategory?.transactions, village)
  }

  const handleShowCellInput =()=>{
    // Hide village input
    setShowVillageInput(false)

    setShowCellInput(true)
  }

  const handleShowVillageInput =()=>{
    // Hide cell input
    setShowCellInput(false)

    setShowVillageInput(true)
  }

  return (
    <>
    { currentUser.role === 'Nurse' && (
      <>
        <Button
          type="submit"
          variant="outlined"
          sx={{ mb: 2 }}
          onClick={() => isShowAddProductQuantityForm(true)}
            >
              + Add {productCategory?.name}
        </Button>

      
          <CSVLink
            data={getCSVData(productCategory, productCategory?.transactions)}
            filename={'report_of_donated_beneficial.csv'}
            style={{ textDecoration: 'underline', marginLeft: '20px' }}
          >
            Download CSV
          </CSVLink>

          <button 
            onClick={() => generatePDF(productCategory?.transactions, currentUser)}
            style={{ textDecoration: 'underline', marginLeft: '20px' }}
          >
            Download Full PDF
          </button>

          {/* cell printing */}

          {showCellInput ? (
            <Box component="form" onSubmit={printCellPDFHandler} >
              <TextField
                sx={{ mb: 2}}
                id="cell" 
                label="Cell" 
                variant='standard'
                name="cell"
                type="text"
                // fullWidth
                focused
                value={cell}
                onChange={(event)=> setCell(event.target.value)}
              />
              <Button
                type="submit"
                // fullWidth
                variant="text"
                disabled={!cell.trim().length}
                sx={{ mt: 2, mb: 0 }}
              >
                Download
              </Button>

            </Box>
            
          ): (
            <button 
              onClick={() => handleShowCellInput()}
              style={{ textDecoration: 'underline', marginLeft: '20px' }}
            >
              Download PDF by Cell
            </button>
          )}
          

          {showVillageInput ? (
            <Box component="form" onSubmit={printVillagePDFHandler} >
              <TextField
                sx={{ mb: 2}}
                id="village" 
                label="Village" 
                variant='standard'
                name="village"
                type="text"
                // fullWidth
                focused
                value={village}
                onChange={(event)=> setVillage(event.target.value)}
              />
              <Button
                type="submit"
                // fullWidth
                variant="text"
                disabled={!village.trim().length}
                sx={{ mt: 2, mb: 0 }}
              >
                Download
              </Button>

            </Box>
            
          ): (
            <button 
              onClick={() => handleShowVillageInput()}
              style={{ textDecoration: 'underline', marginLeft: '20px', marginBottom: '10px' }}
            >
              Download PDF by Village
            </button>
          )}
      </>
    )}

    <Grid container spacing={3}>
    
      {/* Product category Table transactions */}
      <Grid item xs={12} md={12} lg={ showAddProductQuantityForm ? 9 : 12}>
      <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              // height: 240,
            }}
          > 
              <Table size="small" padding="checkbox">
              <TableHead>
                  <TableRow>
                  <TableCell sx={{ fontWeight: 'bold'}}>PRODUCT NAME</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>BENEFICIAL</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>CELL</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>VILLAGE</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>TYPE</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>QUANTITY</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>EXPIRATION DATE</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {productCategory?.transactions?.map((transaction, index)=>(
                      <>
                      <TableRow key={index}>
                          <TableCell>{productCategory.name}</TableCell>
                          <TableCell>
                              {transaction?.beneficial?
                                  (
                                      <Link 
                                          style={{ textDecoration: 'underline'}}
                                          to={`/dashboard/users/${transaction?.beneficial?.id}`}
                                      >
                                          {transaction?.beneficial?.firstName} {transaction?.beneficial?.lastName}
                                      </Link>
                                  )
                                  : 
                                  '-'
                              }
                          </TableCell>
                          <TableCell>
                              { transaction?.beneficial?.cell? 
                                   transaction?.beneficial?.cell: '-'
                              }
                          </TableCell>
                          <TableCell>
                              { transaction?.beneficial?.village? 
                                  transaction?.beneficial?.village : '-'
                              }
                          </TableCell>
                          <TableCell>
                              { transaction?.beneficial?.firstName? 
                                  'STOCKOUT' : 'STOCKIN'
                              }
                          </TableCell>
                          <TableCell>{transaction.quantity}</TableCell>
                          <TableCell>
                              { transaction?.expirationDate? 
                                  new Date(transaction?.expirationDate).toLocaleDateString() 
                                  : '-'
                              }
                          </TableCell>
                      </TableRow>
                      </>
                  ))}
              </TableBody>
              </Table>
        </Paper>
      </Grid>
      
      {/* Add new product quantities in Stock */}
      {showAddProductQuantityForm && (
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            // height: 240,
          }}
        >
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'right',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            <span onClick={()=> isShowAddProductQuantityForm(false)}>x</span>
          </div>
          <Box component="form" onSubmit={handleAddProductQuantity} >
            <TextField
              sx={{ mb: 2}}
              id="quantity" 
              label="Quantity" 
              variant='outlined'
              name="quantity"
              type="number"
              fullWidth
              focused
              value={quantity}
              onChange={(event)=> setQuantity(event.target.value)}
            />

            <TextField
              id="expiration-date" 
              label="Expiration Date" 
              variant='outlined'
              name="expiration-date"
              type="date"
              fullWidth
              focused
              value={expirationDate}
              onChange={(event)=> setExpirationDate(event.target.value)}
              inputProps={{
                min: new Date().toISOString().split('T')[0] // Set min date to today
              }}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!quantity.length || quantity <= 0 || !expirationDate.length}
                sx={{ mt: 2, mb: 0 }}
              >
                Add
            </Button>
          </Box>
          
        </Paper>
      </Grid>
      )}

    </Grid>
    <Copyright sx={{ pt: 4 }} />
    </>
  );
}
