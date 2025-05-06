import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiSave, FiImage, FiX } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTheme } from '../context/ThemeContext';

const CreatePostPage = () => {
  const { isDark } = useTheme();
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState('');
  const [category, setCategory] = useState('technology');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 },],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && inputTag.trim()) {
      setTags([...tags, inputTag.trim()]);
      setInputTag('');
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-7xl mx-auto ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl mt-20 p-8`}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Create New Post
          </h1>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full flex items-center gap-2 ${
                isDark 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setIsPreview(!isPreview)}
            >
              {isPreview ? 'Edit' : 'Preview'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full flex items-center gap-2 ${
                isDark 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-purple-500 text-white hover:bg-purple-600'
              }`}
            >
              <FiSave className="inline-block" />
              Publish
            </motion.button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Input */}
            <div>
              <input
                type="text"
                placeholder="Post Title"
                className={`w-full text-2xl font-bold p-3 rounded-lg ${
                  isDark 
                    ? 'bg-gray-700 text-white placeholder-gray-400' 
                    : 'bg-gray-100 text-gray-800 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Content Editor/Preview */}
            {isPreview ? (
              <div
                className={`prose lg:prose-xl max-w-none p-4 rounded-lg ${
                  isDark 
                    ? 'bg-gray-700 text-white prose-invert' 
                    : 'bg-gray-50'
                }`}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                className={`rounded-lg overflow-hidden ${
                  isDark ? 'quill-dark' : ''
                }`}
              />
            )}
          </div>

          {/* Right Side - Sidebar */}
          <div className="space-y-6">
            {/* Featured Image Upload */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Featured Image
              </h3>
              <label className="cursor-pointer">
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleImageUpload}
                  accept="image/*"
                />
                <div className={`w-full aspect-video rounded-lg border-2 border-dashed flex items-center justify-center ${
                  isDark 
                    ? 'border-gray-600 hover:border-gray-500' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  {featuredImage ? (
                    <img 
                      src={featuredImage} 
                      alt="Featured" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <FiImage className="w-8 h-8 mx-auto mb-2" />
                      <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        Click to upload image
                      </p>
                    </div>
                  )}
                </div>
              </label>
            </div>

            {/* Categories */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Category
              </h3>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full p-2 rounded-lg ${
                  isDark 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-white text-gray-800'
                }`}
              >
                <option value="technology">Technology</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
            </div>

            {/* Tags Input */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Tags
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`px-3 py-1 rounded-full flex items-center gap-2 ${
                      isDark 
                        ? 'bg-gray-600 text-white' 
                        : 'bg-white text-gray-800'
                    }`}
                  >
                    <span>{tag}</span>
                    <FiX 
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveTag(index)}
                    />
                  </motion.div>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add tag and press Enter"
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                onKeyDown={handleAddTag}
                className={`w-full p-2 rounded-lg ${
                  isDark 
                    ? 'bg-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white text-gray-800 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        .quill-dark .ql-toolbar {
          background-color: #374151 !important;
          border-color: #4b5563 !important;
        }
        .quill-dark .ql-container {
          background-color: #374151 !important;
          border-color: #4b5563 !important;
          color: white !important;
        }
        .quill-dark .ql-editor {
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default CreatePostPage;