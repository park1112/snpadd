import React from 'react';

export default function SelectItem({ selectItems }) {
  return (
    <>
      {selectItems.selectProduct.selects.map((selectItems, i) => {
        return (
          <div key={selectItems.name}>
            <div>
              <span className="text-white">
                {selectItems.name} - {selectItems.weight} -{' '}
                {selectItems.division} - {selectItems.count} -{' '}
                {selectItems.fitment}{' '}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
