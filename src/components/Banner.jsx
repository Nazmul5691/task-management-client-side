
import { Link } from 'react-router-dom';
import './banner.css'; 

const Banner = () => {
  return (
    <div className="carousel w-full h-[600px]">
      <div className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co/xShPxjP/task-banner.jpg"
          className="w-full "
        />
        <div className="absolute flex items-center h-full   ">
          <div className=" w-4/5 space-y-5 pl-9">
            <h2 className="text-6xl font-bold text-blue-600">Task <br /> Management</h2>
            <div className='animated-paragraph'>
            <p className="text-lg font-bold">
              Enhance productivity with our task solution. Join for seamless
              organization. Start today.
            </p>
            </div>
            <Link to="/dashboard">
              <span className="btn btn-primary mt-5">Let’s Explore</span>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
