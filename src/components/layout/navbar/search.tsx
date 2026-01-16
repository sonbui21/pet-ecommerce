import { searchAction } from "@/lib/actions/catalog";

export const Search = ({ className, placeholder }: { className: string; placeholder: string }) => {
  return (
    <form action={searchAction} className={className}>
      <input name='search_title' type='text' placeholder={placeholder} aria-label='Search products' />

      <button type='submit' aria-label='Submit search'>
        <i className='flaticon-loupe'></i>
      </button>
    </form>
  );
};
