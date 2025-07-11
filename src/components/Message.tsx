const Message = ({
  text,
  type,
  errorCode,
}: {
  text: string;
  type?: 'error';
  errorCode?: number;
}) => (
  <div
    className={`w-full text-center py-8 ${
      type === 'error' ? 'text-red-600' : 'text-gray-600'
    } text-base`}
  >
    {text}
    {errorCode && (
      <div className="mt-2 text-sm text-red-400">Error code: {errorCode}</div>
    )}
  </div>
);

export default Message;
