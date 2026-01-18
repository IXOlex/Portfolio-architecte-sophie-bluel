// api.js
export async function fetchWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    return response.json();
}

export async function fetchCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    return response.json();
}
