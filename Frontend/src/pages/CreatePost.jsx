import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiImage, FiX, FiAlertCircle } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState('');
  const [category, setCategory] = useState('technology');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('private');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent accidental exit
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (title || content) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [title, content]);

  // Quill configuration
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!content.trim()) newErrors.content = 'Content is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const formData = {
        title,
        content,
        tags,
        category,
        status,
        featuredImage,
        createdAt: new Date().toISOString()
      };

      const res =await fetch('http://localhost:8000/api/posts', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log('Submitting:', formData);
      if (!res.ok) {
        throw new Error('Submission failed');
      }

      const data = await res.json();
      console.log('Submission response:', data);
      navigate('/posts');
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = (e) => {
    if ((e.key === 'Enter' || e.type === 'click') && inputTag.trim()) {
      if (tags.includes(inputTag.trim())) {
        setErrors(prev => ({ ...prev, tags: 'Tag already exists' }));
        return;
      }
      setTags([...tags, inputTag.trim()]);
      setInputTag('');
      setErrors(prev => ({ ...prev, tags: null }));
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, image: 'Please upload an image file' }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFeaturedImage(reader.result);
      setErrors(prev => ({ ...prev, image: null }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-7xl mx-auto ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl mt-20 p-8`}
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {status === 'private' ? 'Private Post' : 'New Post'}
          </h1>
          <div className="flex flex-wrap gap-4">
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
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              <FiSave className="inline-block" />
              {isSubmitting ? 'Publishing...' : status === 'private' ? 'Private' : 'Publish Now'}
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full text-2xl font-bold p-3 rounded-lg transition-all ${
                  isDark 
                    ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500' 
                    : 'bg-gray-100 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-500'
                } ${errors.title ? 'ring-2 ring-red-500' : ''}`}
              />
              {errors.title && (
                <p className="text-red-500 mt-2 flex items-center gap-2">
                  <FiAlertCircle /> {errors.title}
                </p>
              )}
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
              <div className="relative">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  className={`rounded-lg overflow-hidden ${
                    isDark ? 'quill-dark' : ''
                  } ${errors.content ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="Write your post content here..."
                />
                {errors.content && (
                  <p className="text-red-500 mt-2 flex items-center gap-2">
                    <FiAlertCircle /> {errors.content}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right Side - Sidebar */}
          <div className="space-y-6">
            {/* Featured Image Upload */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Featured Image
              </h3>
              <label className="cursor-pointer block">
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleImageUpload}
                  accept="image/*"
                />
                <motion.div
                  whileHover={{ scale: 0.98 }}
                  className={`w-full aspect-video rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden ${
                    isDark 
                      ? 'border-gray-600 hover:border-gray-500' 
                      : 'border-gray-300 hover:border-gray-400'
                  } ${errors.image ? 'border-red-500' : ''}`}
                >
                  {featuredImage ? (
                    <img 
                      src={featuredImage} 
                      alt="Featured" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <FiImage className={`w-8 h-8 mx-auto mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                      <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        Click to upload image (Max 5MB)
                      </p>
                    </div>
                  )}
                </motion.div>
                {errors.image && (
                  <p className="text-red-500 mt-2 flex items-center gap-2">
                    <FiAlertCircle /> {errors.image}
                  </p>
                )}
              </label>
            </div>

            {/* Post Settings */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Post Settings
              </h3>

              {/* Status Selector */}
              <div className="mb-6">
                <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={`w-full p-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-gray-600 text-white hover:bg-gray-500' 
                      : 'bg-white text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <option value="private">Private</option>
                  <option value="public">Published</option>
                </select>
              </div>

              {/* Category Selector */}
              <div className="mb-6">
                <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full p-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-gray-600 text-white hover:bg-gray-500' 
                      : 'bg-white text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <option value="technology">Technology</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="lifestyle">Lifestyle</option>
                </select>
              </div>

              {/* Tags Manager */}
              <div>
                <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Tags
                </label>
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
                        className="cursor-pointer hover:text-red-500 transition-colors"
                        onClick={() => handleRemoveTag(index)}
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Add new tag"
                    value={inputTag}
                    onChange={(e) => setInputTag(e.target.value)}
                    onKeyDown={handleAddTag}
                    className={`w-full p-2 rounded-lg pr-12 ${
                      isDark 
                        ? 'bg-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white text-gray-800 placeholder-gray-500'
                    } ${errors.tags ? 'ring-2 ring-red-500' : ''}`}
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`absolute right-2 top-2 p-1 rounded-full ${
                      isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={(e) => handleAddTag(e)}
                  >
                    Add
                  </motion.button>
                </div>
                {errors.tags && (
                  <p className="text-red-500 mt-2 flex items-center gap-2">
                    <FiAlertCircle /> {errors.tags}
                  </p>
                )}
              </div>
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
          background-color: #1f2937 !important;
          border-color: #4b5563 !important;
          color: white !important;
        }
        .quill-dark .ql-editor {
          min-height: 400px;
          color: white !important;
        }
        .quill-dark .ql-snow.ql-toolbar button:hover,
        .quill-dark .ql-snow.ql-toolbar button:focus {
          color: #d1d5db !important;
        }
      `}</style>
    </div>
  );
};

export default CreatePostPage;