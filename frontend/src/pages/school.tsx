export default function School() {
    return (
        <>
            <h1>School Student</h1>
            <input type="text" placeholder="Enter your name" />
            <input type="text" placeholder="Enter your school name" />
            <input type="text" placeholder="Enter your password" />
            <input type="number" placeholder="Enter your parent phone number" />
            <input type="text" placeholder="Enter your standard" />
            <input type="number" placeholder="Enter your address" />
            <input type="text" placeholder="Enter referral code" />
            <input type="text" placeholder="Enter your feedback details" />
            <button onClick={() => console.log("Submitted")}>Submit</button>
        </>
    )
}