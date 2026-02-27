export default function Demo() {
  const arr = [{ id: 1, name: "aman" },{id:2,name:"khushi"}];

  return (
    <>
      <select name="" id="">
        <option value="">Select option</option>
        {arr.map((obj) => {
          return <option key={obj.id} value={obj.id}>
            {obj.name}
          </option>;
        })}
      </select>
      <h1>this is a demo page</h1>
    </>
  );
}
