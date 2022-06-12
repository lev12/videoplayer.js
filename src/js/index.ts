import '../css/videoplayer-js.scss';
import '../../index.html';

class VideoPlayer
{
    conteiner;
    constructor (id: string){
        this.conteiner = document.getElementById(id);
    }
}

const video = new VideoPlayer('video');
console.log("1");
