import React from 'react';

interface DeleteModalProps {
    onDelete: () => void;
    onCancel: () => void;
    isOpen: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    onDelete,
    onCancel,
    isOpen,
}) => {
    // If the modal is not open, don't render anything
    if (!isOpen) return null;

    return (
        <div
            className="inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
            id="delete-modal"
        >
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onCancel} // Close the modal when clicking on the overlay
            ></div>

            <div className="relative h-full w-full max-w-md p-4 md:h-auto">
                {/* Modal content */}
                <div className="relative rounded-lg bg-white p-4 text-center shadow sm:p-5 dark:bg-gray-800">
                    <button
                        type="button"
                        className="absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={onCancel}
                    >
                        <svg
                            aria-hidden="true"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <svg
                        className="mx-auto mb-3.5 h-11 w-11 text-gray-400 dark:text-gray-500"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <p className="mb-4 text-gray-500 dark:text-gray-300">
                        Are you sure you want to delete this item?
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                        <button
                            type="button"
                            className="focus:ring-primary-300 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                            onClick={onCancel}
                        >
                            No, cancel
                        </button>
                        <button
                            type="button"
                            className="rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onClick={onDelete}
                        >
                            Yes, I'm sure
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
