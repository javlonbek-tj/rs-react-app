'use client';

import { useState } from 'react';

function ErrorTrigger() {
  const [shouldThrow, setShouldThrow] = useState(false);

  function handleClick() {
    setShouldThrow(true);
  }

  if (shouldThrow) {
    throw new Error('Test error triggered by user.');
  }

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 border border-red-300 cursor-pointer text-red-500 rounded-lg hover:bg-red-500  hover:text-gray-50 transition-colors text-sm font-bold"
    >
      Trigger Error
    </button>
  );
}

export default ErrorTrigger;
