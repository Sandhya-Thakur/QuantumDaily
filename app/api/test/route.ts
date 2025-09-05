export async function GET() {
  return new Response('Test GET works')
}

export async function POST() {
  console.log('Test POST received')
  return new Response('Test POST works')
}