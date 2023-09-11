import { useState } from 'react';
import BlogBox from '../components/partials/BlogBox/BlogBox';
import Footer from '../components/structure/Footer/Footer';
import { blogContent, categories, tags } from '../data/pages/BlogData';
import { scrollMedium } from '../utils/helpers/scrollTopHelper';

function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedCategory('All');
    setSelectedTag('');
  };

  const filteredBlogContent = blogContent.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedTag('');
    scrollMedium();
  };

  const filteredByCategory =
    selectedCategory === 'All'
      ? filteredBlogContent
      : filteredBlogContent.filter((blog) => blog.theme === selectedCategory);

  const handleTagClick = (tag: string) => {
    setSelectedCategory(tag);
    setSelectedTag(tag);
    scrollMedium();
  };

  const filteredByTag =
    selectedTag !== ''
      ? filteredByCategory.filter((blog) => blog.theme === selectedTag)
      : filteredByCategory;

  return (
    <>
      <section>
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
            Blog
          </h1>
        </div>
        <div className="py-[10rem] container gap-16 page-padding grid grid-cols-[64fr_35fr] md1000:grid-cols-1 md1000:gap-32">
          <div className="flex flex-col gap-28">
            {filteredByCategory.length === 0 || filteredByTag.length === 0 ? (
              <p className="text-[18px] text-black font-bold mb-5">
                We are sorry, there is no article in this category for now.
              </p>
            ) : (
              filteredByCategory.map((blog, index) => (
                <BlogBox
                  key={index}
                  img={blog.img}
                  title={blog.title}
                  writeAt={blog.writeAt}
                  theme={blog.theme}
                />
              ))
            )}
          </div>

          <div>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                className="border-solid border-[1px] text-[#444] text-[16px] font-medium h-[60px] py-[5px] px-[20px] w-full rounded-tl-xl rounded-bl-xl outline-none"
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
              ></input>
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass bg-[#ff0336] text-white text-[23px] h-[60px] w-[60px] rounded-br-xl rounded-tr-xl pt-[18px]"></i>
              </button>
            </form>

            <div className="flex flex-col bg-[#f8f8f8] my-[35px] p-[30px]">
              <p className="text-[18px] text-black font-bold mb-5">
                Categories
              </p>
              <span className="w-[40px] h-[3.5px] bg-[#ff0336]"></span>
              <ul className="text-[16px] text-[#7e7e7e] font-medium mt-10">
                <li
                  className={`cursor-pointer flex justify-between border-b border-[#dcd9d9] pb-6 mb-10 hover:text-[#ff0336] ease-in duration-200 ${
                    selectedCategory === 'All' ? 'font-bold text-[#ff0336]' : ''
                  }`}
                  onClick={() => handleCategoryClick('All')}
                >
                  <p>
                    <i className="text-[13px] fa-solid fa-chevron-right mr-5"></i>
                    All
                  </p>
                  <span>({filteredBlogContent.length})</span>
                </li>
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer flex justify-between border-b border-[#dcd9d9] pb-6 mb-10 hover:text-[#ff0336] ease-in duration-200 ${
                      selectedCategory === category
                        ? 'font-bold text-[#ff0336]'
                        : ''
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <p>
                      <i className="text-[13px] fa-solid fa-chevron-right mr-5"></i>
                      {category}
                    </p>
                    <span>
                      (
                      {
                        filteredBlogContent.filter(
                          (blog) => blog.theme === category
                        ).length
                      }
                      )
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col bg-[#f8f8f8] my-[35px] p-[30px]">
              <p className="text-[18px] text-black font-bold mb-5">
                Recent Posts
              </p>
              <span className="w-[40px] h-[3.5px] bg-[#ff0336] mb-7"></span>
              <div className="flex flex-col gap-7">
                {blogContent.map((post, index) => (
                  <div key={index} className="flex gap-8">
                    <img
                      src={post.img}
                      alt="recent_img"
                      className="w-[10rem]"
                    />
                    <div className="flex flex-col gap-4 justify-center">
                      <p className="text-[14px] text-[#646464] font-medium">
                        {post.writeAt}, {new Date().getFullYear()}
                      </p>
                      <p className="text-[16px] text-black hover:text-[#ff0336] ease-in duration-200 cursor-pointer font-bold">
                        {post.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col bg-[#f8f8f8] my-[35px] p-[30px]">
              <p className="text-[18px] text-black font-bold mb-5">
                Popular Tags
              </p>
              <span className="w-[40px] h-[3.5px] bg-[#ff0336] mb-7"></span>
              <div className="flex gap-3 text-[16px] text-[#646464] font-medium flex-wrap">
                {tags.map((tag, index) => (
                  <p
                    key={index}
                    className={`bg-white py-[4px] px-[14px] hover:text-[#ff0336] ease-in duration-200 cursor-pointer ${
                      selectedTag === tag ? 'font-bold' : ''
                    }`}
                    onClick={() => handleTagClick(tag)}
                  >
                    #{tag}
                  </p>
                ))}
              </div>
            </div>

            <div className="blog-banner w-full h-[56rem] relative">
              <p className="absolute text-[34px] font-bold uppercase top-16 left-10 z-[2]">
                gymat
              </p>
              <span className="banner-shape top-14 left-0 z-[1] bg-white absolute w-[18rem] h-[60px]"></span>
              <div className="text-white flex flex-col absolute top-[10rem] left-10">
                <p className="text-[64px] font-bold">34%</p>
                <p className="text-[20px] font-bold -mt-[10px]">
                  Flat Discount
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Blog;
