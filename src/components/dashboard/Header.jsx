import React from 'react';

function Header() {
  return (
        <div className="sticky top-0 z-40 lg:mx-auto">
            <div className="flex w-full h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none space-between">
                <div
                    className="sm:flex sm:items-center sm:justify-between px-4"
                >
                    <h3 class="text-base text-base">Dashboard</h3>
                    <div class="mt-3 flex sm:ml-4 sm:mt-0">
                        <span class="p-2">
                            Hello,
                        </span>
                        <button
                            type="primary"
                            class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Logout
                        </button>
                        </div>
                </div>
            </div>

        </div>
  );
}

export default Header;
