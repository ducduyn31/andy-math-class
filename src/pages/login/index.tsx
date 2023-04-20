import {ReactElement} from "react";
import Layout from "@/layout/Layout";

const LoginPage = () => {
    return <div className={"flex justify-center"}>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className={"card-body"}>
                    <h2 className={"card-title"}>Login</h2>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />

                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" />

                        <div className="mt-3">
                            <button className="btn btn-primary w-full">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}

LoginPage.getLayout = (page: ReactElement) => {
    return <Layout> {page} </Layout>
}

export default LoginPage;