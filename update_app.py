import re

with open('portfolio-frontend/src/app/page.tsx', 'r') as f:
    content = f.read()

# 1. Add categories to artworks
artworks_pattern = r"(    year: \"\d{4}\")\n  },"
def replace_category(match):
    return match.group(1) + ",\n    category: \"Drawing\"\n  },"
content = re.sub(artworks_pattern, replace_category, content)

# 2. Update 'through 2' category to 'Painting'
content = content.replace(
    'src: "/images/bethconklin_through2.jpg",\n    title: "through 2",\n    medium: "pencil and watercolour on paper",\n    dimensions: \'12 x 16"\',\n    year: "2018",\n    category: "Drawing"',
    'src: "/images/bethconklin_through2.jpg",\n    title: "through 2",\n    medium: "pencil and watercolour on paper",\n    dimensions: \'12 x 16"\',\n    year: "2018",\n    category: "Painting"'
)

# 3. Last artwork replacement (doesn't have comma after '}')
content = content.replace(
    'year: "2018"\n  }\n];',
    'year: "2018",\n    category: "Drawing"\n  }\n];'
)

# 4. Add state and handlers
hook_target = """export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [fade, setFade] = useState(true);

  const currentArt = artworks[currentIndex];"""

hook_replacement = """export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Drawing");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [fade, setFade] = useState(true);

  const filteredArtworks = artworks.filter(art => art.category === activeCategory);
  const currentArt = filteredArtworks[currentIndex];

  const switchCategory = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    if (activeCategory === category) return;
    setFade(false);
    setTimeout(() => {
      setActiveCategory(category);
      setCurrentIndex(0);
      setShowThumbnails(false);
      setFade(true);
    }, 200);
  };"""
content = content.replace(hook_target, hook_replacement)

# 5. Fix length checks
content = content.replace('artworks.length - 1', 'filteredArtworks.length - 1')
content = content.replace('artworks.map', 'filteredArtworks.map')

# 6. Update JSX nav links
nav_target = """            <li><a href="#" className="font-bold text-[#999] transition-colors">Drawing</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Painting</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Sculpture/Installation</a></li>"""

nav_replacement = """            <li><a href="#" onClick={(e) => switchCategory(e, "Drawing")} className={`transition-colors ${activeCategory === "Drawing" ? "font-bold text-[#999]" : "hover:text-black"}`}>Drawing</a></li>
            <li><a href="#" onClick={(e) => switchCategory(e, "Painting")} className={`transition-colors ${activeCategory === "Painting" ? "font-bold text-[#999]" : "hover:text-black"}`}>Painting</a></li>
            <li><a href="#" onClick={(e) => switchCategory(e, "Sculpture/Installation")} className={`transition-colors ${activeCategory === "Sculpture/Installation" ? "font-bold text-[#999]" : "hover:text-black"}`}>Sculpture/Installation</a></li>"""
content = content.replace(nav_target, nav_replacement)

# 7. Check if currentArt exists before rendering
render_target = """        <div className={`mt-auto transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <div className="font-serif font-bold text-[15px] mb-4 tracking-wide">
            {currentArt.title}
          </div>"""

render_replacement = """        {currentArt && (<div className={`mt-auto transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <div className="font-serif font-bold text-[15px] mb-4 tracking-wide">
            {currentArt.title}
          </div>"""
content = content.replace(render_target, render_replacement)

end_target = """              {showThumbnails ? 'HIDE THUMBNAILS' : 'SHOW THUMBNAILS'}
            </a>
          </div>
        </div>
      </aside>"""
end_replacement = """              {showThumbnails ? 'HIDE THUMBNAILS' : 'SHOW THUMBNAILS'}
            </a>
          </div>
        </div>)}
      </aside>"""
content = content.replace(end_target, end_replacement)

img_target = """              <Image 
                src={currentArt.src} 
                alt={currentArt.title}
                fill
                className="object-contain"
                priority
              />"""

img_replacement = """              {currentArt ? (
                <Image 
                  src={currentArt.src} 
                  alt={currentArt.title}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="text-[#999] tracking-widest text-sm flex items-center justify-center h-full">NO ARTWORKS IN THIS CATEGORY</div>
              )}"""
content = content.replace(img_target, img_replacement)


with open('portfolio-frontend/src/app/page.tsx', 'w') as f:
    f.write(content)
print("Updated page.tsx")
