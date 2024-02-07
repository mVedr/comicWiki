"use client"
import { isLoggedIn } from '../../Functions';
function Favourites() {
    const ok = isLoggedIn();

    if(!ok){
        return <h2>You need to be logged in</h2>
    }

  return (
    <h2>You favourite comics...</h2>
  )
}

export default Favourites