import React from 'react'

export default function IntersectionDemo() {
    let conditionObject = {
        root: null, //observe from whole page
        threshold: "0.6", //60%
    }

    function cb(entries) {
        entries.forEach(entry => {
            let chlid = entry.target.children[0];
            child.play().then(function () {
                if (entry.isIntersecting == false) {
                    child.pause();
                }
            });
        });
    }

    useEffect(() => {
        let observerObject = new IntersectionObserver(cb, conditionObject);
        let elements = document.querySelectorAll('.video-container');

        // Intersection Observer starts observing each video element
        elements.forEach(element => observerObject.observe(element))
    }, []);
    return (
        <div>
            <div className="video-container">
                <Video src={video1} id="a"></Video> {/*custom video tag*/}
            </div>
            <div className="video-container">
                <Video src={video2} id="b"></Video>
            </div>
            <div className="video-container">
                <Video src={video3} id="c"></Video>
            </div>
            <div className="video-container">
                <Video src={video4} id="d"></Video>
            </div>
        </div>
    )
}

function Video(props) {
    return (
        <video className="video-styles" muted={true} id={props.id} loop={true}>
            <source src={props.src} type="video/mp4"></source>
        </video>
    );
}