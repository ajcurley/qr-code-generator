const Button = (props) => {
  return (
    <button
      className="w-full h-9 px-2 text-ms rounded border border-neutral-400 bg-neutral-100 font-bold hover:bg-neutral-200 active:bg-neutral-300"
      { ...props }
    />
  )
}

export default Button
