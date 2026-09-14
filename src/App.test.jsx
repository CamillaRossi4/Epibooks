import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { afterEach, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import Welcome from "./components/Welcome";
import AllTheBooks from "./components/AllTheBooks";
import CommentArea from "./components/CommentArea";
import romance from "./Books/romance.json";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

test("renders Welcome component", () => {
  render(<Welcome />);
  expect(screen.getByRole("heading")).toBeInTheDocument();
});

test("renders all books", () => {
  render(
    <MemoryRouter>
      <AllTheBooks search="" />
    </MemoryRouter>
  );
  const cards = screen.getAllByTestId("book-card");
  expect(cards).toHaveLength(romance.length);
});

test("renders CommentArea", () => {
  render(<CommentArea asin="" />);
  expect(screen.getByText("Reviews")).toBeInTheDocument();
});

test("filters books", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const searchInput = screen.getByPlaceholderText("Search books...");
  fireEvent.change(searchInput, {
    target: { value: "love" },
  });
  const filteredBooks = romance.filter((book) =>
    book.title.toLowerCase().includes("love")
  );
  expect(screen.getAllByTestId("book-card")).toHaveLength(filteredBooks.length);
});

test("changes border when a book is selected", () => {
  render(
    <MemoryRouter>
      <AllTheBooks search="" />
    </MemoryRouter>
  );
  const cards = screen.getAllByTestId("book-card");
  fireEvent.click(cards[0]);
  expect(cards[0].style.border).toBe("3px solid red");
});

test("only one book stays selected", () => {
  render(
    <MemoryRouter>
      <AllTheBooks search="" />
    </MemoryRouter>
  );
  const cards = screen.getAllByTestId("book-card");
  fireEvent.click(cards[0]);
  expect(cards[0].style.border).toBe("3px solid red");
  fireEvent.click(cards[1]);
  expect(cards[0].style.border).not.toBe("3px solid red");
  expect(cards[1].style.border).toBe("3px solid red");
});

test("there are no comments before selecting a book", () => {
  render(
    <MemoryRouter>
      <AllTheBooks search="" />
    </MemoryRouter>
  );
  expect(screen.queryByTestId("single-comment")).not.toBeInTheDocument();
});

test("loads comments after selecting a book", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    json: async () => [
      {
        _id: "1",
        comment: "Great book",
        rate: "5",
        elementId: romance[0].asin,
      },
    ],
  });
  render(
    <MemoryRouter>
      <AllTheBooks search="" />
    </MemoryRouter>
  );
  const cards = screen.getAllByTestId("book-card");
  fireEvent.click(cards[0]);
  await waitFor(() => {
    expect(screen.getByText("Great book")).toBeInTheDocument();
  });
});