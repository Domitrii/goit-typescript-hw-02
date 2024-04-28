import { ChangeEvent, FC, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!query.trim()) {
      toast("Please enter some text to get a result!");
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <header>
      <Toaster
        toastOptions={{
          style: {
            background: "black",
            color: "#fff",
          },
        }}
      />
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={query}
          onChange={handleChange}
          className={css.input}
        />
        <button className={css.formBtn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;