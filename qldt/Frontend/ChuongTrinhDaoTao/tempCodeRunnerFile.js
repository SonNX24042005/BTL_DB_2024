function createMssvFromEmail(email) {
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    console.error("Địa chỉ email không hợp lệ.");
    return null;
  }
  const usernamePart = email.split('@')[0];
  const numberMatch = usernamePart.match(/(\d+)$/);
  return (numberMatch && numberMatch[1]) ? '20' + numberMatch[1] : null;
}
