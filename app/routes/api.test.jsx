import { json } from "@vercel/remix";
export async function loader() {
    console.log('test loader')
}

export async function action() {
    console.log('test action')
  return json({
    test: [{
        id: "1",
        title: "Offer 1",
        description: "Description 1"
    }]
  })
}