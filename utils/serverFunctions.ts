function getErrorMessage(err: unknown): string {
  let message = "Something went wrong.";

  if (err != null && typeof err == "object" && "message" in err) {
    message = err.message as string;
  }

  return message;
}

export { getErrorMessage };
