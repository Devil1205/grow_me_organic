import { useEffect, useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function Main2() {


    const data = [
        {
            "department": "customer_service",
            "sub_departments": [
                "support",
                "customer_success"
            ]
        },
        {
            "department": "design",
            "sub_departments": [
                "graphic_design",
                "product_design",
                "web_design"
            ]
        }
    ]


    const showHide = (element: any) => {
        // element.target.offsetParent.childNodes[2].style.height = "100px";
        if (element.target.offsetParent.childNodes[2].style.maxHeight === "0px")
            element.target.offsetParent.childNodes[2].style.maxHeight = "300px";
        else
            element.target.offsetParent.childNodes[2].style.maxHeight = "0px";
        // element.target.offsetParent.childNodes[2].style.height = "0px";
    }

    const [listHead, setListHead] = useState<any[]>([]);
    const [subListHead, setSubListHead] = useState<any[]>([]);

    useEffect(() => {
        document.querySelectorAll('.listHead').forEach(element => {
            listHead.push(true);
        })
        document.querySelectorAll('.subList').forEach((element, index) => {
            subListHead.push([]);
            element.childNodes.forEach(elem => {
                subListHead[index].push(true);
            })
            // console.log(element);
        })
    }, [])


    const checkUncheck = (element: any, deptIndex: number) => {
        let newArr = [...listHead];
        newArr[deptIndex] = !newArr[deptIndex];
        if (newArr[deptIndex]) {
            setSubListHead(prev => {
                let temp = [...prev];
                temp[deptIndex] = [...prev[deptIndex]];
                temp[deptIndex].forEach((dept: any, ind: number) => {
                    temp[deptIndex][ind] = true;
                });
                // console.log(temp);
                return temp;
            })
        }
        else {
            setSubListHead(prev => {
                let temp = [...prev];
                temp[deptIndex] = [...prev[deptIndex]];
                temp[deptIndex].forEach((dept: any, ind: number) => {
                    temp[deptIndex][ind] = false;
                });
                // console.log(temp);
                return temp;
            })
        }
        setListHead(newArr);
    }

    const allTrue = (array: Array<[]>) => {
        return array.every(Boolean);
    }

    const checkAll = (element: any, deptIndex: number, subIndex: number) => {
        // console.log(subListHead);
        setSubListHead(prev => {
            let newArr = [...prev];
            newArr[deptIndex] = [...prev[deptIndex]];
            newArr[deptIndex][subIndex] = !newArr[deptIndex][subIndex];
            //uncheck dept if subdept is unchecked
            if (!newArr[deptIndex][subIndex]) {
                let temp = [...listHead];
                temp[deptIndex] = false;
                setListHead(temp);
            }
            else {
                let temp = true;
                newArr.forEach(subdept => {
                    if (!allTrue(subdept)) {
                        temp = false;
                    }
                })
                if (temp) {
                    let temp = [...listHead];
                    temp[deptIndex] = true;
                    setListHead(temp);
                }
                // console.log(temp);
            }
            return newArr;
        })
    }

    const updateCheck = () => {
        // console.log(subListHead);
    }

    return (
        <div className='main2'>
            <h1>Component 2</h1>
            <div>
                {data.map((dept, deptIndex) => {
                    return (
                        <FormGroup className='list' key={deptIndex}>
                            <button onClick={(element) => { showHide(element) }}></button>
                            <FormControlLabel control={<Checkbox checked={listHead[deptIndex] === undefined ? true : listHead[deptIndex]} onClick={(element: any) => { checkUncheck(element, deptIndex) }} />} label={dept.department} className='listHead' style={{ margin: "0px 20px"}}/>
                            <div className='subList'>
                                {dept.sub_departments.map((subElement, subIndex) => {
                                    return (<FormControlLabel key={subIndex} control={<Checkbox checked={subListHead.length === 0 ? true : subListHead[deptIndex][subIndex]} onClick={(element: any) => { checkAll(element, deptIndex, subIndex) }} onChange={updateCheck} />} label={subElement} style={{ margin: "0px 45px" }} />)
                                })}</div>
                        </FormGroup>
                    )
                })}
            </div>
        </div>
    )
}

export default Main2