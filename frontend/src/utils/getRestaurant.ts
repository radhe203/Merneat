export default async function getRestaurant(baseUrl: string, userId: string) {
  try {
    const res = await fetch(`${baseUrl}/api/restaurants/get/${userId}`, {
      method: "GEt",
     
    });

    const data = await res.json();

    if (res.ok) {
      if (data) {
        return data;
      }
    }
  } catch (error) {
    console.error(error);
  }
}
