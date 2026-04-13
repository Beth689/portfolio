import re

with open('portfolio-frontend/src/app/page.tsx', 'r') as f:
    text = f.read()

# Extract the artworks array block
start_idx = text.find('const artworks = [')
end_idx = text.find('];', start_idx) + 2

artworks_str = text[start_idx:end_idx]

# Let's just literally define the new artworks string
repl_artworks = """const artworks = [
  {
    src: "/images/bethconklin_selfportrait_1500pixelsw.jpg",
    title: "self portrait",
    medium: "pencil and watercolour on paper",
    dimensions: '10 x 12"',
    year: "2016",
    category: "Drawing"
  },
  {
    src: "/images/bethconklin_apothecary_1500pixelsw.jpg",
    title: "apothecary",
    medium: "pencil and watercolour on paper",
    dimensions: '15 x 20"',
    year: "2017",
    category: "Drawing"
  },
  {
    src: "/images/bethconklin_untitled_version4.jpg",
    title: "untitled version 4",
    medium: "pencil and watercolour on paper",
    dimensions: '8 x 10"',
    year: "2015",
    category: "Drawing"
  },
  {
    src: "/images/bluehand.jpg",
    title: "blue hand",
    medium: "pencil and watercolour on paper",
    dimensions: '11 x 14"',
    year: "2019",
    category: "Drawing"
  },
  {
    src: "/images/fourpiece.jpg",
    title: "four piece",
    medium: "pencil and watercolour on paper",
    dimensions: '20 x 24"',
    year: "2020",
    category: "Drawing"
  },
  {
    src: "/images/goldleaf.jpg",
    title: "gold leaf",
    medium: "pencil and watercolour on paper",
    dimensions: '10 x 12"',
    year: "2021",
    category: "Drawing"
  },
  {
    src: "/images/somafinaldetail.jpg",
    title: "soma final detail",
    medium: "pencil and watercolour on paper",
    dimensions: '16 x 20"',
    year: "2022",
    category: "Drawing"
  },
  {
    src: "/images/through_1retouched.jpg",
    title: "through 1",
    medium: "pencil and watercolour on paper",
    dimensions: '12 x 16"',
    year: "2018",
    category: "Painting"
  },
  {
    src: "/images/bethconklin_through2.jpg",
    title: "through 2",
    medium: "pencil and watercolour on paper",
    dimensions: '12 x 16"',
    year: "2018",
    category: "Painting"
  },
  {
    src: "/images/through_3retouched.jpg",
    title: "through 3",
    medium: "pencil and watercolour on paper",
    dimensions: '12 x 16"',
    year: "2018",
    category: "Painting"
  },
  {
    src: "/images/bethconklin_through4.jpg",
    title: "through 4",
    medium: "pencil and watercolour on paper",
    dimensions: '12 x 16"',
    year: "2018",
    category: "Painting"
  }
];"""

new_text = text[:start_idx] + repl_artworks + text[end_idx:]

with open('portfolio-frontend/src/app/page.tsx', 'w') as f:
    f.write(new_text)

print("Updated artworks successfully!")
