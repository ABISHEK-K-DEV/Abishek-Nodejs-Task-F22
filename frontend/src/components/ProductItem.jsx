import React, { useState } from 'react';

const ProductItem = ({ product, onAddToCart }) => {
  const [likes, setLikes] = useState(product.likes || 0);
  const [dislikes, setDislikes] = useState(product.dislikes || 0);
  const [comments, setComments] = useState(product.comments || []);
  const [newComment, setNewComment] = useState('');

  const handleLike = async () => {
    setLikes(likes + 1);
  };

  const handleDislike = async () => {
    setDislikes(dislikes + 1);
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment('');
    }
  };

  return (
    <div className="border p-4 mb-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-gray-900 font-bold mb-4">
        ${product.price ? product.price.toFixed(2) : '0'}
      </p>
      <div className="flex items-center mb-4">
        <button onClick={handleLike} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2">
          Like ({likes})
        </button>
        <button onClick={handleDislike} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
          Dislike ({dislikes})
        </button>
      </div>
      <button
        onClick={() => onAddToCart(product)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
      >
        Add to Cart
      </button>
      <div className="mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border p-2 rounded w-full mb-2"
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          Comment
        </button>
      </div>
      {comments.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <ul className="list-disc pl-5">
            {comments.map((comment, index) => (
              <li key={index} className="mb-2">
                {comment}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
