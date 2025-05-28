export function formatMessageTime(date) {

return new Date(message.createdAt).toLocaleString('en-US', { //en-GB
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })};