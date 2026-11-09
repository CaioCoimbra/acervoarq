import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import TextPost from "@/components/TextPost";

describe("TextPost (characterization)", () => {
  it("renders TextPostTop and TextPostBottom composed vertically", () => {
    const { container } = render(<TextPost />);

    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).not.toBeNull();
    expect(wrapper.className).toContain("flex");
    expect(wrapper.className).toContain("flex-col");
    expect(wrapper.className).toContain("justify-between");
    expect(wrapper.className).toContain("w-1/3");
    expect(wrapper.className).toContain("gap-1.5");

    // Direct children order: TextPostTop first, then TextPostBottom
    const children = Array.from(wrapper.children);
    expect(children).toHaveLength(2);
    expect(children[0]).toContainElement(screen.getByText("Título do Projeto"));
    expect(children[1]).toContainElement(screen.getByText(/fusão entre a ancestralidade/i));
  });

  it("TextPostTop shows the hardcoded title and author", () => {
    render(<TextPost />);

    expect(screen.getByText("Título do Projeto")).toBeInTheDocument();
    expect(screen.getByText("Autor")).toBeInTheDocument();
  });

  it("TextPostBottom shows the long description body", () => {
    const { container } = render(<TextPost />);

    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs.length).toBeGreaterThan(0);

    const body = paragraphs[0];
    expect(body.className).toContain("line-clamp-14");
    expect(body.className).toContain("text-justify");
    expect(body.textContent).toContain("O grande triunfo do projeto reside na reinterpretação");
  });
});
