import Comboboxes from './Comboboxes';

export default function CreateTodo() {
  return (
    <div className="flex-grow border-l  border-gray-700 max-w-3xl sm:ml-[73px] xl:ml-[370px]">
      <div className="m-5">
        <div className="sm:flex sm:items-center">
          <form>
            <Comboboxes />
          </form>
        </div>
      </div>
    </div>
  );
}
