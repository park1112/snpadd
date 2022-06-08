import { useMemo, useState } from 'react';

export default function ProductSelect({
  product,
  dispatch,
  ACTION_TYPES,
  selectItem,
  bgimage,
  setBgimage,
  countAdd,
}) {
  const [nameSelect, setNameSelect] = useState(''); //양파 선택됨!
  const [weightSelect, setWeightSelect] = useState(-1); //무게 선택됨!
  const [division, setDivisionSelect] = useState(-1); //구분 선택됨!
  const [fitment, setFitmentSelect] = useState(-1); //부자제 선택됨!
  const [count, setCount] = useState(-1); //수량 선택됨!
  const [fitCount, setFitCount] = useState(1); //부자제 수량 선택

  const sendPost = () => {
    const list = {
      id: Date.now(),
      name: selectItem.items[0].품명,
      weight: selectItem.items[0].weight[weightSelect].weight,
      division: selectItem.items[0].weight[weightSelect].division[division],
      fitment: selectItem.items[0].weight[weightSelect].부자제[fitment],
      count: selectItem.items[0].weight[weightSelect].수량[count],
      fitmentCount: fitCount,
    };
    dispatch({ type: ACTION_TYPES.endItemSelect, payload: list });

    setNameSelect('');
    setWeightSelect(-1);
    setDivisionSelect(-1);
    setFitmentSelect(-1);
    setCount(-1);
    setFitCount(1);
    // countAdd();
  };
  return (
    <>
      <div>
        <div className="text-white">상품 추가 !!</div>
      </div>
      <div>
        <div className="text-white">15키로 </div>
      </div>

      <div className="col-span-12 sm:col-span-12 mb-10">
        <div className="flex flex-wrap mb-5 grid grid-cols-3 gap-4">
          {product.map((product) => (
            <span
              key={product.품명}
              className={`${
                nameSelect === product.품명
                  ? 'mx-5 rounded-full w-44 text-white bg-[#1d9bf0] hover:bg-[#1d9bf0] focus:outline-none font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max '
                  : 'mx-5 rounded-full w-44 text-black bg-white hover:bg-[#1d9bf0] focus:outline-none font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max '
              }`}
              onClick={() =>
                setNameSelect(product.품명) ||
                setBgimage(product.이미지) ||
                dispatch({
                  type: ACTION_TYPES.addItem,
                  payload: product.품명,
                })
              }
            >
              <img
                className="rounded-full w-14 h-14 max-w-none"
                alt="A"
                src={product.이미지}
              />
              <span className="flex items-center px-3 py-2">
                {product.품명}
              </span>
            </span>
          ))}
        </div>
      </div>
      {/* 키로 선택 !!!시작 */}
      {nameSelect ? (
        <div className="col-span-12 sm:col-span-12 mb-10">
          <div className="flex flex-wrap mb-5 grid grid-cols-3 gap-4">
            {selectItem.items[0].weight.map((product, i) => (
              <span
                key={product.weight}
                className={`${
                  weightSelect === i
                    ? 'mx-5 rounded-full w-44 text-white bg-[#1d9bf0] hover:bg-[#1d9bf0] focus:outline-none font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max '
                    : 'mx-5 rounded-full w-44 text-black bg-white hover:bg-[#1d9bf0] focus:outline-none font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max '
                }`}
                onClick={() => setWeightSelect(i)}
              >
                <img
                  className="rounded-full w-14 h-14 max-w-none"
                  alt="A"
                  src={bgimage}
                />
                <span className="flex items-center px-3 py-2">
                  {product.weight}
                </span>
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {/* 키로 선택 !!!끝! */}
      {/* 상품구분선택 !!!시작 */}
      {weightSelect > -1 ? (
        <div className="col-span-12 sm:col-span-12 mb-10">
          <div className="flex flex-wrap mb-5 grid grid-cols-3 gap-4">
            {selectItem.items[0].weight[weightSelect].division.map(
              (product, i) => (
                <span
                  key={product}
                  className={`${
                    division === i
                      ? 'mx-5 rounded-full w-44 text-white bg-[#1d9bf0] hover:bg-[#1d9bf0] focus:outline-none font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max '
                      : 'mx-5 rounded-full w-44 text-black bg-white hover:bg-[#1d9bf0] focus:outline-none font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max '
                  }`}
                  onClick={() => setDivisionSelect(i)}
                >
                  <img
                    className="rounded-full w-14 h-14 max-w-none"
                    alt="A"
                    src={bgimage}
                  />
                  <span className="flex items-center px-3 py-2">{product}</span>
                </span>
              )
            )}
          </div>
        </div>
      ) : null}
      {/* 상품구분선택 !!!끝! */}
      {/* 부자제선택 !!!시작 */}
      {division > -1 ? (
        <div className="col-span-12 sm:col-span-12 mb-10">
          <div className="flex flex-wrap mb-5 grid grid-cols-3 gap-4">
            {selectItem.items[0].weight[weightSelect].부자제.map(
              (product, i) => (
                <span
                  key={product}
                  className={`${
                    fitment === i
                      ? 'mx-5 rounded-full w-44 text-white bg-[#1d9bf0] hover:bg-[#1d9bf0] focus:outline-none font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max '
                      : 'mx-5 rounded-full w-44 text-black bg-white hover:bg-[#1d9bf0] focus:outline-none font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max '
                  }`}
                  onClick={() => setFitmentSelect(i)}
                >
                  <img
                    className="rounded-full w-14 h-14 max-w-none"
                    alt="A"
                    src={bgimage}
                  />
                  <span className="flex items-center px-3 py-2">{product}</span>
                </span>
              )
            )}
          </div>
        </div>
      ) : null}
      {/* 부자제선택 !!!끝! */}
      {/* 수량선택 !!!시작 */}
      {fitment > -1 ? (
        <div className="col-span-12 sm:col-span-12 mb-10">
          <div className="flex flex-wrap mb-5 grid grid-cols-3 gap-4">
            {selectItem.items[0].weight[weightSelect].수량.map((product, i) => (
              <span
                key={product}
                className={`${
                  count === i
                    ? 'mx-5 rounded-full w-44 text-white bg-[#1d9bf0] hover:bg-[#1d9bf0] focus:outline-none font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max '
                    : 'mx-5 rounded-full w-44 text-black bg-white hover:bg-[#1d9bf0] focus:outline-none font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max '
                }`}
                onClick={() => setCount(i)}
              >
                <img
                  className="rounded-full w-14 h-14 max-w-none"
                  alt="A"
                  src={bgimage}
                />
                <span className="flex items-center px-3 py-2">{product}</span>
              </span>
            ))}
          </div>
          <div className="col-span-2 sm:col-span-2 lg:col-span-2 mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              부자제 수량
            </label>
            <input
              value={fitCount}
              onChange={(e) => setFitCount(Number(e.target.value))}
              type="number"
              name="fitCount"
              id="fitCount"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      ) : null}
      {/* 수량선택 !!!끝! */}
      {/* 버튼추가! !!!시작 */}
      {count > -1 ? (
        <div className="px-4 py-3 mb-20  text-right sm:px-6">
          <button
            type="submit"
            // disabled={!name && !selectedFile}
            onClick={sendPost}
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      ) : null}
      {/* 버튼추가! !!!끝! */}
    </>
  );
}
