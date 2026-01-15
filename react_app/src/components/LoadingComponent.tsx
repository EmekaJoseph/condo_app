import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingComponent = () => {
    return (
        <div className="container">
            <div className="row g-3 justify-content-center align-items-center min-vh-100">
                <div className="col-lg-7">
                    <Skeleton /> <br />
                    <Skeleton height={400} />
                </div>

                <div className="col-lg-5">
                    <Skeleton height={450} />
                </div>
            </div>
        </div>
    )
}

export default LoadingComponent
