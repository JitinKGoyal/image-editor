import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import "../styles/sidebar.css"

export default function Sidebar() {

    const [countValues, setCountValues] = useState({
        saturation: 1.000,
        brightness: 1.000,
        grayscale: 0.000,
        hue: 0.000,
        blur: 0.000,
        contrast: 1.000,
        sepia: 0.000,
        invert: false
    });

    const [filterStringState, setfilterStringState] = useState("")

    const saturation = useRef();
    const brightness = useRef();
    const grayscale = useRef();
    const hue = useRef();
    const blur = useRef();
    const contrast = useRef();
    const sepia = useRef();

    // Handle inputs getting from range buttons
    function handleFilterInputChange(e) {

        let value = (e.target.value / 100 * 3).toFixed(3);

        if (e.target.name === "saturation") {
            handleUpdateCountState("saturation", value)

        } else if (e.target.name === "brightness") {
            handleUpdateCountState("brightness", value)

        }
        else if (e.target.name === "grayscale") {
            let value = (e.target.value / 100).toFixed(3);
            handleUpdateCountState("grayscale", value)

        }
        else if (e.target.name === "hue") {
            let value = (e.target.value / 100 * 360).toFixed(0);
            handleUpdateCountState("hue", value)

        }
        else if (e.target.name === "blur") {

            let value = (e.target.value / 100 * 10).toFixed(3);
            handleUpdateCountState("blur", value)

        }
        else if (e.target.name === "contrast") {
            let value = (e.target.value / 100 * 3).toFixed(3);
            handleUpdateCountState("contrast", value)

        }
        else if (e.target.name === "sepia") {
            let value = (e.target.value / 100).toFixed(3);
            handleUpdateCountState("sepia", value)

        }

    }

    // Putting values in state
    function handleUpdateCountState(filterType, value) {
        setCountValues({ ...countValues, [filterType]: value });
    }

    // create filter string and execute filter
    function executeFilter() {
        let { saturation, brightness, grayscale, hue, blur, contrast, sepia, invertValue } = countValues

        let finalFilter = `${saturation ? `saturate(${saturation})` : ``} 
                           ${brightness ? `brightness(${brightness})` : ``}
                           ${blur ? `blur(${blur}px)` : ``}
                           ${grayscale ? `grayscale(${grayscale})` : ``}
                           ${hue ? `hue-rotate(${hue}deg)` : ``}
                           ${contrast ? `contrast(${contrast})` : ``}
                           ${sepia ? `sepia(${sepia})` : ``}
                           ${invertValue ? `invert(${invertValue})` : ``}
                            `

        // Execute filter
        document.getElementById('image').style.filter = finalFilter

        // Filter string for download image
        setfilterStringState(finalFilter);
    }

    function download() {
        let element = document.getElementById('image');
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        if (!element.style.zoom) {
            ctx.canvas.width = (element.offsetWidth * 3)
            ctx.canvas.height = (element.offsetHeight * 3)

        } else {
            ctx.canvas.width = (element.offsetWidth * element.style.zoom * 1.5)
            ctx.canvas.height = (element.offsetHeight * element.style.zoom * 1.5)

        }

        ctx.filter = filterStringState;
        ctx.drawImage(element, 0, 0, canvas.width, canvas.height);

        var link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = canvas.toDataURL()
        link.click();
        notify()

    };

    function downloadResized() {
        let element = document.getElementById('image');
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');


        ctx.canvas.width = (element.offsetWidth)
        ctx.canvas.height = (element.offsetHeight)

        ctx.filter = filterStringState;
        ctx.drawImage(element, 0, 0, canvas.width, canvas.height);

        var link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = canvas.toDataURL()
        link.click();
        notify()
    }

    // For resetting values
    const handleReset = (e) => {

        if (e === "saturation") {

            setCountValues({ ...countValues, saturation: 1 });
            saturation.current.value = 33.33

        }
        else if (e === "brightness") {

            setCountValues({ ...countValues, brightness: 1 });
            brightness.current.value = 33.33

        }
        else if (e === "grayscale") {

            setCountValues({ ...countValues, grayscale: 0 });
            grayscale.current.value = 0

        }
        else if (e === "hue") {

            setCountValues({ ...countValues, hue: 0 });
            hue.current.value = 0

        }
        else if (e === "blur") {

            setCountValues({ ...countValues, blur: 0 });
            blur.current.value = 0

        }
        else if (e === "contrast") {

            setCountValues({ ...countValues, contrast: 1 });
            contrast.current.value = 33.33

        }
        else if (e === "sepia") {

            setCountValues({ ...countValues, sepia: 0 });
            sepia.current.value = 0

        }
    }

    useEffect(() => {
        executeFilter()
    }, [countValues])



    // function handleCropInputChange(e) {
    //     let element = document.getElementById('image');
    //     document.getElementById('img-prt').style.display = 'none';

    //     let canvas = document.getElementById('canvas1')
    //     canvas.style.display = "inline-block"
    //     let ctx = canvas.getContext('2d');


    //     ctx.canvas.width = (element.width/200) * e.target.value
    //     ctx.canvas.height = (element.height/200) * e.target.value

    //     ctx.drawImage(element, 0, 0, canvas.width, canvas.height);

    //     let prtElement = document.getElementById("img-prt")
    // }


    const notify = () => toast("Downloaded successfully", { containerId: 'TOP_RIGHT', autoClose: 5000, type: toast.TYPE.SUCCESS });;

    return (
        <>
            <section className="app">
                <aside className="sidebar">
                    <header>
                        <h2 className='text-center m-3 heading' style={{ fontFamily: "'Monoton', cursive" }}>Editor</h2>
                    </header>
                    <nav className="sidebar-nav">

                        <ul>
                            <li>
                                <a href="#" className='icon-s-prt'>
                                    <i className="ion-bag"></i>
                                    <img src="/images/icons/icons8-paint-palette-94.png" alt="" />
                                    <span>Filters</span>
                                    <img style={{ float: "right", marginTop: "5px" }} src="/images/icons/icons8-right-94.png" alt="" />
                                </a>
                                <ul className="nav-flyout overflow-auto">
                                    <li>
                                        <div className='btn my-filters-btn mx-2 d-flex justify-content-between'>
                                            <div>
                                                <p> <img src="images/icons/icons8-saturation-48.png" height="25px" alt="" /> Saturation</p>
                                                <input type="range" name='saturation' ref={saturation} defaultValue="33.33" onChange={handleFilterInputChange} />
                                            </div>
                                            <div className='d-flex flex-column justify-content-around sec'>
                                                <p>{countValues.saturation}</p>
                                                <span title='reset' onClick={() => handleReset("saturation")}><img src="/images/icons/loading.png" alt="" /></span>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='btn my-filters-btn mx-2 d-flex justify-content-between'>
                                            <div>
                                                <p> <img src="images/icons/icons8-sun-48.png" height="25px" alt="" />Brightness</p>
                                                <input type="range" name='brightness' ref={brightness} defaultValue="33.33" onChange={handleFilterInputChange} />
                                            </div>
                                            <div className='d-flex flex-column justify-content-around sec'>
                                                <p>{countValues.brightness}</p>
                                                <span title='reset' onClick={() => handleReset("brightness")}><img src="/images/icons/loading.png" alt="" /></span>

                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='btn my-filters-btn mx-2 d-flex justify-content-between'>
                                            <div>
                                                <p><img src="images/icons/grayscale.png" height="25px" alt="" /> Grayscale</p>
                                                <input type="range" name='grayscale' ref={grayscale} defaultValue="0" onChange={handleFilterInputChange} />
                                            </div>
                                            <div className='d-flex flex-column justify-content-around sec'>

                                                <p>{countValues.grayscale}</p>
                                                <span title='reset' onClick={() => handleReset("grayscale")}><img src="/images/icons/loading.png" alt="" /></span>

                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='btn my-filters-btn mx-2 d-flex justify-content-between'>
                                            <div>
                                                <p> <img src="images/icons/icons8-color-palette-48.png" height="25px" alt="" /> Hue</p>
                                                <input type="range" name='hue' ref={hue} defaultValue="0" onChange={handleFilterInputChange} />
                                            </div>
                                            <div className='d-flex flex-column justify-content-around sec'>
                                                {countValues.hue && <p>{countValues.hue} deg</p>}
                                                <span title='reset' onClick={() => handleReset("hue")}><img src="/images/icons/loading.png" alt="" /></span>

                                            </div>
                                        </div>
                                    </li>
                                    <div className='btn my-filters-btn mx-2 d-flex justify-content-between'>
                                        <div>
                                            <p> <img src="images/icons/icons8-blur-48.png" height="25px" alt="" />Blur</p>
                                            <input type="range" name='blur' ref={blur} defaultValue="0" onChange={handleFilterInputChange} />
                                        </div>
                                        <div className='d-flex flex-column justify-content-around sec'>
                                            <p>{countValues.blur} </p>
                                            <span title='reset' onClick={() => handleReset("blur")}><img src="/images/icons/loading.png" alt="" /></span>

                                        </div>
                                    </div>
                                    <li>
                                        <div className='btn my-filters-btn mx-2 d-flex justify-content-between'>
                                            <div>

                                                <p><img src="images/icons/icons8-contrast-64.png" height="25px" alt="" />Contrast</p>
                                                <input type="range" name='contrast' ref={contrast} defaultValue="33.33" onChange={handleFilterInputChange} />
                                            </div>
                                            <div className='d-flex flex-column justify-content-around sec'>
                                                <p>{countValues.contrast} </p>
                                                <span title='reset' onClick={() => handleReset("contrast")}><img src="/images/icons/loading.png" alt="" /></span>

                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='btn my-filters-btn mx-2 d-flex justify-content-between'>
                                            <div>

                                                <p><img src="images/icons/icons8-old-fashioned-family-photo-48.png" height="25px" alt="" /> Sepia</p>
                                                <input type="range" name='sepia' ref={sepia} defaultValue="0" onChange={handleFilterInputChange} />
                                            </div>
                                            <div className='d-flex flex-column justify-content-around sec'>
                                                <p>{countValues.sepia} </p>
                                                <span title='reset' onClick={() => handleReset("sepia")}><img src="/images/icons/loading.png" alt="" /></span>

                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </li>

                            {/* crop and resize */}
                            {/* <li>
                                <a href="#" className='icon-s-prt'>
                                    <i className="ion-bag"></i>
                                    <img src="/images/icons/icons8-paint-palette-94.png" alt="" />
                                    <span>Resize & crop</span>
                                    <img style={{ float: "right", marginTop: "5px" }} src="/images/icons/icons8-right-94.png" alt="" />
                                </a>
                                <ul className="nav-flyout overflow-auto">
                                    <li>
                                        <div className='btn my-filters-btn mx-2 d-flex justify-content-between'>
                                            <div>
                                                <p> <img src="images/icons/icons8-saturation-48.png" height="25px" alt="" /> Percentage</p>
                                                <input type="range" name='percentageSize' defaultValue="50" onChange={handleCropInputChange} />
                                            </div>
                                            <div className='d-flex flex-column justify-content-around sec'>
                                                <p>{countValues.saturation}</p>
                                                <span title='reset' onClick={() => handleReset("saturation")}><img src="/images/icons/loading.png" alt="" /></span>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='btn my-filters-btn mx-2 d-flex justify-content-between'>
                                            <div>
                                                <p> <img src="images/icons/icons8-sun-48.png" height="25px" alt="" />Brightness</p>
                                                <input type="range" name='brightness' ref={brightness} defaultValue="33.33" onChange={handleFilterInputChange} />
                                            </div>
                                            <div className='d-flex flex-column justify-content-around sec'>
                                                <p>{countValues.brightness}</p>
                                                <span title='reset' onClick={() => handleReset("brightness")}><img src="/images/icons/loading.png" alt="" /></span>

                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='btn my-filters-btn mx-2 d-flex justify-content-between'>
                                            <div>
                                                <p><img src="images/icons/grayscale.png" height="25px" alt="" /> Grayscale</p>
                                                <input type="range" name='grayscale' ref={grayscale} defaultValue="0" onChange={handleFilterInputChange} />
                                            </div>
                                            <div className='d-flex flex-column justify-content-around sec'>

                                                <p>{countValues.grayscale}</p>
                                                <span title='reset' onClick={() => handleReset("grayscale")}><img src="/images/icons/loading.png" alt="" /></span>

                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='btn my-filters-btn mx-2 d-flex justify-content-between'>
                                            <div>
                                                <p> <img src="images/icons/icons8-color-palette-48.png" height="25px" alt="" /> Hue</p>
                                                <input type="range" name='hue' ref={hue} defaultValue="0" onChange={handleFilterInputChange} />
                                            </div>
                                            <div className='d-flex flex-column justify-content-around sec'>
                                                {countValues.hue && <p>{countValues.hue} deg</p>}
                                                <span title='reset' onClick={() => handleReset("hue")}><img src="/images/icons/loading.png" alt="" /></span>

                                            </div>
                                        </div>
                                    </li>
                                    <div className='btn my-filters-btn mx-2 d-flex justify-content-between'>
                                        <div>
                                            <p> <img src="images/icons/icons8-blur-48.png" height="25px" alt="" />Blur</p>
                                            <input type="range" name='blur' ref={blur} defaultValue="0" onChange={handleFilterInputChange} />
                                        </div>
                                        <div className='d-flex flex-column justify-content-around sec'>
                                            <p>{countValues.blur} </p>
                                            <span title='reset' onClick={() => handleReset("blur")}><img src="/images/icons/loading.png" alt="" /></span>

                                        </div>
                                    </div>
                                    <li>
                                        <div className='btn my-filters-btn mx-2 d-flex justify-content-between'>
                                            <div>

                                                <p><img src="images/icons/icons8-contrast-64.png" height="25px" alt="" />Contrast</p>
                                                <input type="range" name='contrast' ref={contrast} defaultValue="33.33" onChange={handleFilterInputChange} />
                                            </div>
                                            <div className='d-flex flex-column justify-content-around sec'>
                                                <p>{countValues.contrast} </p>
                                                <span title='reset' onClick={() => handleReset("contrast")}><img src="/images/icons/loading.png" alt="" /></span>

                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='btn my-filters-btn mx-2 d-flex justify-content-between'>
                                            <div>

                                                <p><img src="images/icons/icons8-old-fashioned-family-photo-48.png" height="25px" alt="" /> Sepia</p>
                                                <input type="range" name='sepia' ref={sepia} defaultValue="0" onChange={handleFilterInputChange} />
                                            </div>
                                            <div className='d-flex flex-column justify-content-around sec'>
                                                <p>{countValues.sepia} </p>
                                                <span title='reset' onClick={() => handleReset("sepia")}><img src="/images/icons/loading.png" alt="" /></span>

                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </li> */}
                            {/* <li>
                                <a href="#"><i className="ion-ios-settings"></i> <span className="">Controls</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <div className='btn btn-light mx-3'>
                                            <img src="images/icons/icons8-invert-selection-48.png" height="25px" alt="" />
                                        </div>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-camera-outline"></i>Creeper</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-chatboxes-outline"></i>Hate</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-cog-outline"></i>Grinder</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="ion-ios-briefcase-outline"></i> <span className="">Folio</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="#"><i className="ion-ios-flame-outline"></i>Burn</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-lightbulb-outline"></i>Bulbs</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-location-outline"></i>Where You</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-locked-outline"></i>On Lock</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-navigate-outline"></i>Ghostface</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="ion-ios-analytics-outline"></i> <span className="">Graphicals</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="#"><i className="ion-ios-timer-outline"></i>Timers</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-arrow-graph-down-left"></i>You Lose</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-partlysunny-outline"></i>Stormy</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-timer-outline"></i>Lookie Look</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-game-controller-a-outline"></i>Dork Mfer</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="ion-ios-paper-outline"></i> <span className="">Papers</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="#"><i className="ion-ios-filing-outline"></i>File Cab</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-information-outline"></i>Infos</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-paperplane-outline"></i>Planes</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-android-star-outline"></i>Shop</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="ion-ios-navigate-outline"></i> <span className="">Ass Finder</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="#"><i className="ion-ios-flame-outline"></i>Burn</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-lightbulb-outline"></i>Bulbs</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-location-outline"></i>Where You</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-locked-outline"></i>On Lock</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-navigate-outline"></i>Ghostface</a>
                                    </li>
                                </ul>
                            </li> */}
                            <li>
                                <a onClick={download} className="download-btn mt-5 icon-s-prt shadow-lg" > <span className=""><img src="images/icons/icons8-download-94.png" alt="" />Download image</span></a>
                            </li>
                            {/* <li>
                                <a onClick={downloadResized} className="download-btn mt-5 icon-s-prt shadow-lg" > <span className=""><img src="images/icons/icons8-download-94.png" alt="" />Download resized image</span></a>
                            </li> */}
                        </ul>
                    </nav>
                </aside>
            </section>
        </>
    )
}
