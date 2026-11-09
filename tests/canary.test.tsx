import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("canário", () => {
  it("executa testes com jsdom e testing library", () => {
    render(<p>Oi</p>);
    expect(screen.getByText("Oi")).toBeInTheDocument();
  });
});
