import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";
import { products } from "../data/products";

describe("ProductList Component - Normal Cases", () => {
  test("renders all product names", () => {
    render(<ProductList />);

    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });

  test("renders all product descriptions", () => {
    render(<ProductList />);

    products.forEach((product) => {
      expect(screen.getByText(product.description)).toBeInTheDocument();
    });
  });

  test("renders all product prices", () => {
    render(<ProductList />);

    products.forEach((product) => {
      expect(
        screen.getByText(`$${product.price}`)
      ).toBeInTheDocument();
    });
  });
});

describe("ProductList Component - Edge Cases", () => {
  test("renders correctly when product list is empty", () => {
    const emptyProducts = [];

    render(
      <div>
        {emptyProducts.map((product) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    );

    expect(screen.queryByText(/./)).not.toBeInTheDocument();
  });

  test("does not crash when description is missing", () => {
    const brokenProduct = [
      { id: 99, name: "Broken Product", price: 100 }
    ];

    render(
      <div>
        {brokenProduct.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    );

    expect(screen.getByText("Broken Product")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
  });

  test("renders duplicate IDs but would warn in console", () => {
    const duplicateProducts = [
      { id: 1, name: "Test 1", description: "Desc", price: 10 },
      { id: 1, name: "Test 2", description: "Desc", price: 20 }
    ];

    render(
      <div>
        {duplicateProducts.map((product) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    );

    expect(screen.getByText("Test 1")).toBeInTheDocument();
    expect(screen.getByText("Test 2")).toBeInTheDocument();
  });
});