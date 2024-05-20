import { useParams } from "react-router-dom";
import useFetchDetails from "../../hooks/useFetchDetails";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../../components/Divider";
import useFetch from "../../hooks/useFetch";
import HorizontalItems from "../Home/Home/HorizontalItems";


const DetailsPage = () => {
    const params = useParams()
    console.log(params)
    const imageURL = useSelector(state => state?.movieHutData?.imageURL)
    const { data } = useFetchDetails(`/${params?.details}/${params?.id}`)
    const { data: starCast } = useFetchDetails(`/${params?.details}/${params?.id}/credits`)
    const { data: similarData } = useFetch(`/${params?.details}/${params?.id}/similar`)
    const { data: recommendationData } = useFetch(`/${params?.details}/${params?.id}/recommendations`)

    console.log(data)
    console.log(starCast)


    return (
        <div className=''>
            <div className='w-full h-[350px] relative hidden md:block'>
                <div className="w-full h-full ">
                    <img
                        src={imageURL + data?.backdrop_path}
                        className='h-full w-full object-cover'
                        alt=""
                    />
                </div>

                {/* give the gradient */}
                <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'>
                </div>
            </div>



            <div className="container px-4 mx-auto  relative py-16 md:py-0 flex flex-col md:flex-row gap-5 md:gap-10">

                <div className="md:-mt-28 flex justify-center md:justify-start min-w-60 ">
                    <img
                        src={imageURL + data?.poster_path}
                        className='w-60 h-80  object-cover'
                        alt=""
                    />
                </div>

                <div className="">
                    <h2 className="text-2xl text-white md:text-3xl font-bold">{data?.title || data?.name}</h2>
                    <p className="text-neutral-400">{data?.tagline}</p>

                    <Divider />

                    <div className="flex items-center text-sm gap-3 my-2">
                        <p>Rating : {Number(data?.vote_average).toFixed(1)}+</p>
                        <span>|</span>
                        <p>Views : {Number(data?.vote_count)}</p>
                        <span>|</span>
                        <p>Duration : {Number(data?.runtime)} min </p>
                    </div>

                    <Divider />

                    <div>
                        <h3 className="text-white text-xl font-bold my-1">Overview</h3>
                        <p>{data?.overview}</p>
                    </div>

                    <Divider />

                    <div className="flex gap-3 items-center text-center my-3">
                        <p>Status : {data?.status}</p>
                        <span>|</span>
                        <p>Release Data : {moment(data?.release_date).format("MMMM Do YYYY")}</p>
                        <span>|</span>
                        <p>Revenue : {Number(data?.revenue)}</p>
                    </div>

                    <Divider />

                    <div>
                        <p><span className="text-white">Director :</span> {starCast?.crew.filter(fl => fl.job === "Director").map(fl => fl.name).join(',')}</p>
                        <p><span className="text-white">Writer :</span> {starCast?.crew.filter(fl => fl.job === "Writer").map(fl => fl.name).join(',')}</p>
                        <p><span className="text-white">Producer :</span> {starCast?.crew.filter(fl => fl.job === "Producer").map(fl => fl.name).join(',')}</p>

                        {/* <Divider /> */}

                        <div className="hidden lg:block">
                            <p><span className="text-white">Executive Producer :</span> {starCast?.crew.filter(fl => fl.job === "Executive Producer").map(fl => fl.name).join(',')}</p>
                            <p><span className="text-white">Art :</span> {starCast?.crew.filter(fl => fl.job === "Production Design").map(fl => fl.name).join(',')}</p>
                            <p><span className="text-white">Camera :</span> {starCast?.crew.filter(fl => fl.job === "Director of Photography").map(fl => fl.name).join(',')}</p>
                            <p><span className="text-white">Editing :</span> {starCast?.crew.filter(fl => fl.job === "Editor").map(fl => fl.name).join(',')}</p>
                            <p><span className="text-white">Costume & Make-Up :</span> {starCast?.crew.filter(fl => fl.job === "Costume Design").map(fl => fl.name).join(',')}</p>
                            <p><span className="text-white">Writing :</span> {starCast?.crew.filter(fl => fl.job === "Characters").map(fl => fl.name).join(',')}</p>
                            <p><span className="text-white">Visual Effects :</span> {starCast?.crew.filter(fl => fl.job === "Visual Effects Supervisor").map(fl => fl.name).join(',')}</p>
                            <p><span className="text-white">Sound :</span> {starCast?.crew.filter(fl => fl.job === "Original Music Composer").map(fl => fl.name).join(',')}</p>
                            <p><span className="text-white">Crew :</span> {starCast?.crew.filter(fl => fl.job === "Stunts").map(fl => fl.name).join(',')}</p>
                        </div>
                    </div>
                    <Divider />


                    <div>
                        <h1 className="font-bold text-xl">Star Cast :</h1>

                        <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-4 my-4">
                            {
                                starCast?.cast?.filter(el => el?.profile_path).map((star, index) => {
                                    return (
                                        <div key={index}>
                                            <img
                                                src={imageURL + star?.profile_path}
                                                alt=""
                                                className="w-20 h-20 object-cover rounded-full"
                                            />
                                            <p className="font-bold text-center text-neutral-400 text-sm">{star?.name}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>

            <div>
                <HorizontalItems heading={`Similar ${params?.details}`} fetchData={similarData} media_type={params?.details} ></HorizontalItems>
                <HorizontalItems heading={`recommendations ${params?.details}`} fetchData={recommendationData} media_type={params?.details} ></HorizontalItems>
            </div>

        </div>
    );
};

export default DetailsPage;