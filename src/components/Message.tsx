const Message = ({ text, type }: { text: string; type?: 'error' }) => (
  <div
    className={`w-full text-center py-8 ${
      type === 'error' ? 'text-red-600' : 'text-gray-600'
    }`}
  >
    {text}
  </div>
);

export default Message;
