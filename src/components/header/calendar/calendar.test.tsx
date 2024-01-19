import { render, screen } from "@testing-library/react";
import Calendar from ".";
import { dimensionsIcons } from "../../../config";

describe("Calendar component tests", () => {
  test("it renders correctly", () => {
    render(<Calendar />);
    const calendarElement = screen.getByTestId("calendar-component");
    expect(calendarElement).toBeInTheDocument();
  });

  test("it renders calendar icon with correct source", () => {
    render(<Calendar />);
    const calendarIcon = screen.getByAltText("calendar-icon");
    expect(calendarIcon).toBeInTheDocument();
    expect(calendarIcon).toHaveAttribute("src", "images/calendar.png");
  });

  test("calendar icon has correct dimensions", () => {
    render(<Calendar />);
    const calendarIcon = screen.getByAltText("calendar-icon");

    expect(calendarIcon).toBeInTheDocument();

    expect(calendarIcon).toHaveAttribute(
      "width",
      dimensionsIcons.large.toString()
    );
    expect(calendarIcon).toHaveAttribute(
      "height",
      dimensionsIcons.large.toString()
    );
  });

  test("date is in the right format", () => {
    render(<Calendar />);
    const dateOverlay = screen.getByTestId("date-overlay");
    expect(dateOverlay).toHaveTextContent(/\d{1,2}[A-Za-z]{3}/);
  });

  test("it displays the current date", () => {
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const expectedDate = `${dayOfMonth}${monthNames[monthIndex]}`;

    render(<Calendar />);
    const dateOverlay = screen.getByTestId("date-overlay");
    expect(dateOverlay).toHaveTextContent(expectedDate);
  });
});
