import Badge from 'react-bootstrap/Badge';
import { MdOutlineEmail } from "react-icons/md";

function Sidebar(){
    return (
        <div className="SideBar p-4 d-flex flex-column align-items-center">
            <img className="ImageProfile pb-3" src="https://res.cloudinary.com/djss53chk/image/upload/v1723684799/Memojis/Male/eso2cfyjbqnjrkdrd7v1.svg" alt="" />
            <h4>Richard Hanrick</h4>
            <div className='TagProfession p-2 d-flex align-items-center justify-content-center'>
                <p className='m-0'>Web Developer</p>
            </div>
            <hr className='w-100'/>
            <div className='TagsInformation w-100'> 
                <div className='w-100 d-flex align-items-center gap-3'>
                    <div className='IconInformation d-flex align-items-center justify-content-center'>
                        <MdOutlineEmail size={15}/>
                    </div>
                    <div>
                        <p className='m-0 text-muted'>EMAIL</p>
                        <p className='m-0'>richard@email.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;