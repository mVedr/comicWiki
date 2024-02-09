
function UserMsg({ text, currName }) {
  const words = text.split(" ");
  if (words.length > 0) {
    const firstWord = words[0];
    const remainingText = words.slice(1).join(" ");
    console.log(firstWord)
    return (
      <h5>
        {firstWord === currName+':'? (
          <span style={{color:"blue",textDecoration:"underline"}}>{firstWord} </span>
        ) : (
          <span style={{textDecoration:"underline"}}>{firstWord} </span>
        )}
        {remainingText}
      </h5>
    );
  } else {
    return <h5></h5>;
  }
}

export default UserMsg;
