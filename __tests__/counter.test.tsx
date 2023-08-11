import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "@/app/components/Counter";
import "@testing-library/jest-dom";

describe("Counter", () => {
  
  it('has valid initial state', () => {
    render(<Counter />);

    const paragraph = screen.getByTestId("counter_value");
    const decrement = screen.getByText("Decrement");
    const increment = screen.getByText("Increment");
    const heading = screen.getByRole('heading');

    expect(paragraph).toBeInTheDocument();
    expect(decrement).toBeInTheDocument();
    expect(increment).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe("Counter");
  })
  
  test('decrement button works', () => {
    // Arrange
    render(<Counter />);

    // Act
    fireEvent.click(screen.getByRole("button", { name: "Decrement" }));
    
    // Assert
    const paragraph = screen.getByTestId("counter_value");
    expect(paragraph.textContent).toBe("-1");
  })

  test('increment button works', () => {
    // Arrange
    render(<Counter />);

    // Act
    fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    
    // Assert
    const paragraph = screen.getByTestId("counter_value");
    expect(paragraph.textContent).toBe("1");
  })

  test('decrement reaches max limit', () => {
    // Arrange
    render(<Counter />);

    // Act
    for(let i = 0; i < 10; i++){
      fireEvent.click(screen.getByRole("button", { name: "Decrement" }));
    }
    
    // Assert
    const paragraph = screen.getByTestId("counter_value");
    expect(paragraph.textContent).toBe("-10");
  })

  test('decrement doesnt surpass max limit', () => {
    // Arrange
    render(<Counter />);

    // Act
    for(let i = 0; i < 11; i++){
      fireEvent.click(screen.getByRole("button", { name: "Decrement" }));
    }
    
    // Assert
    const decrementButton = screen.getByRole("button", { name: "Decrement"});
    expect(decrementButton).toHaveClass("Counter--btnhidden");
  })

  test('increment reaches max limit', () => {
    // Arrange
    render(<Counter />);

    // Act
    for(let i = 0; i < 10; i++){
      fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    }
    
    // Assert
    const paragraph = screen.getByTestId("counter_value");
    expect(paragraph.textContent).toBe("10");
  })

  test('increment doesnt surpass max limit', () => {
    // Arrange
    render(<Counter />);

    // Act
    for(let i = 0; i < 11; i++){
      fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    }
    
    // Assert
    const incrementButton = screen.getByRole("button", { name: "Increment"});
    expect(incrementButton).toHaveClass("Counter--btnhidden");
  })

  test('increment to max limit then decrement', () => {
    // Arrange
    render(<Counter />);

    // Act
    for(let i = 0; i < 10; i++){
      fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    }
    fireEvent.click(screen.getByRole("button", { name: "Decrement" }));

    // Assert
    const incrementButton = screen.getByRole("button", { name: "Increment"});
    expect(incrementButton).toHaveClass("Counter--btnvisible");
  })

  test('greater than 8 message', () => {
    // Arrange
    render(<Counter />);

    // Act
    for(let i = 0; i < 10; i++){
      fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    }

    // Assert
    const message = screen.getByTestId("message");
    expect(message.textContent).toBe("Greater than 8");
  })

  test('less than or equal to 3 message', () => {
    // Arrange
    render(<Counter />);

    // Act
    for(let i = 0; i < 2; i++){
      fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    }

    // Assert
    const message = screen.getByTestId("message");
    expect(message.textContent).toBe("Less than or equal to 3");
  })

  test('greater than 3 less than 8 message', () => {
    // Arrange
    render(<Counter />);

    // Act
    for(let i = 0; i < 6; i++){
      fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    }

    // Assert
    const message = screen.getByTestId("message");
    expect(message.textContent).toBe("Greater than 3, less than or equal to 8");
  })
  
});
