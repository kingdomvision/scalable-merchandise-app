import { json } from "@remix-run/node";
export async function loader({ request }) {
    console.log('test loader')
}

export async function action({ request }) {
    console.log('test action')
  return json({
    test: [{
        id: "1",
        title: "Offer 1",
        description: "Description 1"
    }]
  })
}