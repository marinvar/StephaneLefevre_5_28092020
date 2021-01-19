export async function retrieveTeddies() {
  const url = "http://localhost:3000/api/teddies";

  const response = await fetch(url);
  return response.json();
}

export async function getTeddyDetails(productId) {
  const url = 'http://localhost:3000/api/teddies/' + productId;

  const response = await fetch(url);
  return response.json();
}