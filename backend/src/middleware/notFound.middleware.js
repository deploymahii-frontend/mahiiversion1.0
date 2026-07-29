export default function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
}
