"use client"
import styles from './page.module.css'
import {useEffect, useState} from "react";
import MembersForm from "@/app/membersForm/page";
import {useSession} from "next-auth/react";


// export const metadata = {
//     title: 'members',
//     description: 'members',
// }
interface Member {
    id: number,
    first_name: string;
    last_name: string;
    contact_no: string;
    date_of_birth: string;
    gender: string;
    address: string;
    created_at: string
}


const fetchData = async () => {
    console.log("fetch data")
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/members`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

const Members = () => {
    const [formStatus, setFormStatus] = useState(true)
    const [isUpdate, setIsUpdate] = useState(false)
    const [members, setMembers] = useState<Member[]>([])
    const [isLoading, setLoading] = useState(false)
    const { status, data } = useSession();
    console.log(data)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const data = await fetchData();
            setMembers(data);
            setLoading(false)
        })();

        return () => {
            // this now gets called when the component unmounts
        };
    }, [isUpdate]);

    const addMore = (isUpdate: boolean) => {
        console.log(isUpdate)
        if (isUpdate)
            setIsUpdate(prevState => !prevState)
        setFormStatus(prevState => !prevState)
    }

    const table = <>
        <div className={styles.tableWrapper}>
            {
                isLoading ?
                    <p>Loading...</p> :
                    <table className={styles.memberTable}>
                        <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Contact No</th>
                            <th>Age(in years)</th>
                            <th>Address</th>
                        </tr>
                        </thead>
                        <tbody>
                        {members.map((member, index) => {
                            return (
                                <tr key={member.id}>
                                    <td>{index + 1}</td>
                                    <td>{member.first_name} {member.last_name}</td>
                                    <td>{member.gender}</td>
                                    <td>{member.contact_no}</td>
                                    <td>{new Date().getFullYear() - new Date(member.date_of_birth).getFullYear()}</td>
                                    <td>{member.address}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>}

        </div>
        {
            status === "authenticated"
            &&
            data?.user?.email === process.env.NEXT_PUBLIC_AUTHORIZED_ADMIN_EMAIL
            &&
            <button className={styles.addMore} onClick={() => addMore(false)}>
                Add More
            </button>
        }



    </>

    const form = <MembersForm close={addMore}/>

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Members</h1>
            {formStatus ? table : form}


        </div>
    )
}
export default Members
