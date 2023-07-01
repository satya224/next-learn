"use client"
import {useForm} from "react-hook-form";
import styles from './page.module.css'

enum GenderEnum {
    female = "Female",
    male = "Male",
    other = "Other"
}

interface FormInput {
    first_name: String;
    last_name: String;
    contact_no: String;
    date_of_birth: String;
    gender: GenderEnum;
    address: String;
}

const formatDate = (date: Date, type: string) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return type === "-" ? [year, month, day].join('-') : [day, month, year].join('/');
}

const sendData = async (formData: FormInput) => {
    const res = await fetch("http://localhost:3000/api/members", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to post data");
    }

    return res.json();
}
const MembersForm = (props: any) => {
    const form = useForm<FormInput>()
    const {register, handleSubmit, formState, reset} = form
    const {errors} = formState
    const onSubmit = async (formData: FormInput) => {
        await sendData(formData)
        props.close(true)
    }

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formTitle}>
                    <span className={styles.close} onClick={() => props.close(false)}>X</span>
                </div>
                <label htmlFor={"first_name"}>First Name</label>
                <input
                    className={styles.input}
                    type={"text"}
                    id={"first_name"}
                    {...register("first_name", {
                        required: {
                            value: true,
                            message: "* required"
                        }
                    })}
                />
                <p className={styles.errors}>{errors.first_name?.message}</p>
                <label htmlFor={"last_name"}>Last Name</label>
                <input
                    className={styles.input}
                    type={"text"}
                    id={"last_name"}
                    {...register("last_name")}
                />
                <label htmlFor={"contact_no"}>Contact No</label>
                <input
                    className={styles.input}
                    type={"tel"}
                    id={"contact_no"}
                    {...register("contact_no", {
                        required: {
                            value: true,
                            message: "* required"
                        },
                        pattern: {
                            value: /^[0-9]{10}$/i,
                            message: "* provide valid contact no."
                        }
                    })}
                />
                <p className={styles.errors}>{errors.contact_no?.message}</p>
                <div className={styles.group}>
                    <div>
                        <label htmlFor={"gender"}>Gender</label>
                        <select className={styles.input} id={"gender"} {...register("gender")}>
                            <option value={GenderEnum.male}>Male</option>
                            <option value={GenderEnum.female}>Female</option>
                            <option value={GenderEnum.other}>Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor={"date_of_birth"}>Date of Birth</label>
                        <input
                            className={styles.input}
                            type={"date"}
                            id={"date_of_birth"}
                            min='1950-01-01' max={formatDate(new Date(), '-')}
                            {...register("date_of_birth", {
                                required: {
                                    value: true,
                                    message: "* required"
                                },
                                min: {
                                    value: '1950-01-01',
                                    message: "* value must be 01/01/1950 or later"
                                },
                                max: {
                                    value: `${formatDate(new Date(), '-')}`,
                                    message: `* value must be ${formatDate(new Date(), '/')} or earlier`
                                }
                            })}
                        />
                        <p className={styles.errors}>{errors.date_of_birth?.message}</p>
                    </div>
                </div>


                <label htmlFor={"address"}>Address</label>
                <input
                    className={styles.input}
                    type={"text"}
                    id={"address"}
                    {...register("address", {
                        required: {
                            value: true,
                            message: "* required"
                        }
                    })}
                />
                <p className={styles.errors}>{errors.address?.message}</p>
                <div className={styles.button}>
                    <button className={styles.submit}>Submit</button>
                    <input
                        className={styles.reset}
                        type="button"
                        onClick={() => reset()}
                        value="Reset"
                    />
                </div>

            </form>
        </div>
    )

}
export default MembersForm
