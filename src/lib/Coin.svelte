<!-- Coin.svelte -->
<script>
  // Script logic if needed
</script>

<div class="coin">
  <div class="front jump">
    <div class="star"></div>
    <span class="currency">$</span>
    <div class="shapes">
      <!-- <div class="shape_l"></div> -->
      <!-- <div class="shape_r"></div> -->
      <span class="top">space</span>
      <span class="bottom">dollah</span>
    </div>
  </div>
  <!-- <div class="shadow"></div> -->
</div>

<style>
  @keyframes jump {
    0% {
      top: 0;
    }
    50% {
      top: -40px;
    }
    100% {
      top: 0;
    }
  }
  
  @keyframes shine {
    0% {
      margin: 20px -65px;
    }
    50% {
      margin: 70px -85px;
    }
    100% {
      margin: 20px -65px;
    }
  }
  
  @keyframes swift {
    0% {
      opacity: 0.8;
    }
    50% {
      opacity: 0.4;
      transform: scale(0.8);
    }
    100% {
      opacity: 0.8;
    }
  }
  
  
  .coin {
    margin: auto;
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    height: 150px;
    width: 150px;
  }
  
  .jump {
    animation: jump 1.5s infinite ease;
  }

  .coin .front, .coin .back {
    position: absolute;
    height: 150px;
    width: 150px;
    background: #ffbd0b;
    border-radius: 50%;
    border-top: 7px solid #ffd84c;
    border-left: 7px solid #ffd84c;
    border-right: 7px solid #d57e08;
    border-bottom: 7px solid #d57e08;
    transform: rotate(44deg);
  }

  .coin .front:before, .coin .back:before {
    content: "";
    position: absolute;
    margin: 35.5px 35.5px;
    width: 70px;
    height: 70px;
    background: #f0a608;
    border-radius: 50%;
    border-bottom: 5px solid #ffd84c;
    border-right: 5px solid #ffd84c;
    border-left: 5px solid #d57e08;
    border-top: 5px solid #d57e08;
    z-index: 2;
  }

  .currency {
    overflow: hidden;
    position: absolute;
    color: #ffbd0b;
    font-size: 40px;
    transform: rotate(-44deg);
    line-height: 3.7;
    width: 100%;
    height: 100%;
    text-align: center;
    text-shadow: 0 3px 0 #cb7407;
    z-index: 3;
    border-radius: 50%;
  }

  .currency:after {
    content: "";
    position: absolute;
    height: 200px;
    width: 40px;
    margin: 20px -65px;
    box-shadow: 50px -23px 0 -10px rgba(255, 255, 255, 0.22), 85px -10px 0 -16px rgba(255, 255, 255, 0.19);
    transform: rotate(-50deg);
    animation: shine 1.5s infinite ease;
  }

  .shapes {
    transform: rotate(-44deg);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .shape_l, .shape_r {
    width: 20px;
    height: 4px;
    background: #d57e08;
    border-top: 2px solid #c47207;
    margin: 75px 7px;
  }

  .shape_l:before, .shape_r:before,
  .shape_l:after, .shape_r:after {
    content: "";
    position: absolute;
    width: 20px;
    height: 4px;
    background: #d57e08;
    border-top: 2px solid #c47207;
  }

  .shape_l:before, .shape_r:before {
    margin: -10px 0;
  }

  .shape_l:after, .shape_r:after {
    margin: 8px 0;
  }

  .top, .bottom {
    font-family: "Montserrat", sans-serif;
    font-size: 30px;
    color: #d67f08;
    text-align: center;
    width: 100%;
    position: absolute;
    left: 0;
  }

  .top {
    top: 0;
  }

  .bottom {
    bottom: 0;
  }

  .coin .shadow {
    width: 100%;
    height: 20px;
    background: rgba(0, 0, 0, 0.4);
    left: 0;
    bottom: -50px;
    border-radius: 50%;
    z-index: -1;
    margin: 185px 7px 0 7px;
    animation: swift 1.5s infinite ease;
  }
</style>
