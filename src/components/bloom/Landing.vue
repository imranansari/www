<template>
  <div>

  <section id="main-section">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 class="text-xs-center">
          <h1 class="display-3 font-weight-regular">
            Awesome internet services
          </h1>
          <br />
          <v-btn to="/register" large color="blue" dark>
          Get started for Free
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </section>

  <v-container class="pt-5 pb-5 text-xs-center text-md-left">

      <v-hover>
        <v-card
        id="service-platform"
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 6 : 1}`"
        class="mb-5">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12 md5 order-xs2>
                <h2 class="display-1 font-weight-regular">
                  Bloom Platform
                </h2>
                <br/>
                <p class="body-2">
                  The global cloud platform. Security scanner, serverless and much more...
                </p>
                <v-btn to="/platform" flat color="primary">
                  Learn more
                </v-btn>
                <v-btn to="/register" color="blue" dark>
                  Try it Free
                </v-btn>
                </v-flex>

                <v-flex xs12 md5 offset-md2 order-md2 class="text-xs-center">
                  <img alt="product scanner"
                  class="img-fluid"
                  height="200"
                  src="/imgs/logos/platform_256.png">
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-hover>


        <v-hover>
          <v-card
          id="service-drive"
          slot-scope="{ hover }" :class="`elevation-${hover ? 6 : 1}`"
          class="mb-5">
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 md5 order-md2 class="text-xs-center">
                  <img alt="Bloom Drive"
                    class="img-fluid"
                    height="200"
                    src="/imgs/logos/drive_256.png">
                </v-flex>

                <v-flex xs12 md5 order-xs2 offset-md2>
                  <h2 class="display-1 font-weight-regular">
                    Bloom Drive
                  </h2>
                  <br/>
                  <p class="body-2">
                    A safe place for all your files. 50GB free.
                  </p>
                  <v-btn to="/drive" flat color="primary">
                    Learn more
                  </v-btn>
                  <v-btn to="/register" color="blue" dark>
                    Try it Free
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-hover>


        <v-hover>
          <v-card
          id="service-bitflow"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 6 : 1}`"
          class="mb-5">
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 md5 order-xs2>
                  <h2 class="display-1 font-weight-regular">
                    Bitflow
                  </h2>
                  <br/>
                  <p class="body-2">
                    Your cloud-based download manager. Download any file directly to your Drive.
                  </p>
                  <v-btn to="/bitflow" flat color="primary">
                    Learn more
                  </v-btn>
                  <v-btn to="/register" color="blue" dark>
                    Try it Free
                  </v-btn>
                </v-flex>

                <v-flex xs12 md5 offset-md2 order-md2 class="text-xs-center">
                  <img alt="Bitflow"
                    height="200"
                    lass="img-fluid" src="/imgs/logos/bitflow_256.png">
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-hover>


        <v-hover>
          <v-card
          id="service-notes"
          slot-scope="{ hover }" :class="`elevation-${hover ? 6 : 1}`"
          class="mb-5">
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 md5 order-md2 class="text-xs-center">
                  <img alt="Bloom Notes"
                    class="img-fluid"
                    height="200"
                    src="/imgs/logos/notes_256.png">
                </v-flex>

                <v-flex xs12 md5 order-xs2 offset-md2>
                  <h2 class="display-1 font-weight-regular">
                    Notes
                  </h2>
                  <br/>
                  <p class="body-2">
                    Quickly capture what’s on your mind and get a reminder later at the right place
                    or time
                  </p>
                  <v-btn to="/notes" flat color="primary">
                    Learn more
                  </v-btn>
                  <v-btn to="/register" color="blue" dark>
                    Try it Free
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-hover>


        <v-hover>
        <v-card
        id="service-contacts"
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 6 : 1}`"
        class="mb-5">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12 md5 order-xs2>
                <h2 class="display-1 font-weight-regular">
                  Contacts
                </h2>
                <br/>
                <p class="body-2">
                  Keep your contacts organized and up to date
                </p>
                <v-btn to="/contacts" flat color="primary">
                  Learn more
                </v-btn>
                <v-btn to="/register" color="blue" dark>
                  Try it Free
                </v-btn>
                </v-flex>

                <v-flex xs12 md5 offset-md2 order-md2 class="text-xs-center">
                  <img alt="product contacts"
                  class="img-fluid"
                  height="200"
                  src="/imgs/logos/contacts_256.png">
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-hover>


        <v-card id="card-customers" class="elevation-0">
          <v-layout row wrap class="text-xs-center">
            <v-flex xs12>
              <h2 class="display-2 font-weight-regular">
                Built for business, loved by developers
              </h2>
              <div class="mt-5 justify-content-center">
              <a target="_blank" rel="noopener" href="https://crisp.im/"
                class="ml-3 mr-3 mb-2 mt-2">
                  <img alt="crisp" title="crisp" src="/imgs/landings/bloom/partners/crisp_blue.svg"
                    height="38">
                </a>
                <a target="_blank" rel="noopener" href="https://www.thefamily.co/"
                  class="ml-3 mr-3 mb-2 mt-2">
                  <img alt="42" title="TheFamily mafia"
                    src="/imgs/landings/bloom/partners/thefamily.png" height="42">
                </a>
                <a target="_blank" rel="noopener" href="https://cryptio.co/"
                  class="ml-3 mr-3 mb-2 mt-2">
                  <img alt="styl" title="cryptio"
                    src="/imgs/landings/bloom/partners/Cryptio_Logo_C_RGB.svg" height="42">
                </a>

              </div>

              <div class="mt-2 mt-md-5 justify-content-center">
                <a target="_blank" rel="noopener" href="http://www.42.fr/"
                  class="ml-3 mr-3 mb-2 mt-2">
                  <img alt="42" title="42" src="/imgs/landings/bloom/partners/42.png" height="42">
                </a>
                <a target="_blank" rel="noopener" href="https://www.clevy.io/"
                  class="ml-3 mr-3 mb-2 mt-2">
                  <img alt="clevy" title="clevy" src="/imgs/landings/bloom/partners/clevy.svg"
                    height="42">
                </a>
                <a target="_blank" rel="noopener" href="https://goosebump.com/"
                  class="ml-3 mr-3 mb-2 mt-2">
                  <img alt="lifeina" title="Goosebump"
                    src="/imgs/landings/bloom/partners/goosebump.jpg" height="42">
                </a>
              </div>
            </v-flex>
          </v-layout>
        </v-card>

    </v-container>

  <blm-footer />
</div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class Landing extends Vue {
  // props
  // data
  // computed
  // lifecycle
  // watch
  // methods
}
</script>


<style scoped lang="scss">
.v-card {
  border-radius: 8px;
}

#service-platform {
  background: right center no-repeat url(/imgs/landings/bloom/corner_purple.svg);
  background-color: #fff;
}
#service-drive {
  background: left center no-repeat url(/imgs/landings/bloom/corner_green.png);
  background-color: #fff;
}
#service-bitflow {
  background: right center no-repeat url(/imgs/landings/bloom/corner_orange.svg);
  background-color: #fff;
}
#service-notes {
  background: left center no-repeat url(/imgs/landings/bloom/corner_green.png);
  background-color: #fff;
}
#service-contacts {
  background: right center no-repeat url(/imgs/landings/bloom/corner_orange.svg);
  background-color: #fff;
}


#main-section {
  /* background: url(/imgs/landings/bloom/alt_wide_2.svg) no-repeat center fixed; */
  background: url(/imgs/landings/bloom/alt_wide_2.svg) no-repeat center;
  -webkit-background-size: cover; /* pour Chrome et Safari */
  -moz-background-size: cover; /* pour Firefox */
  -o-background-size: cover; /* pour Opera */
  background-size: cover; /* version standardisée */
  height: calc(100vh - 64px);
  padding-top: 15vh;
}

#card-customers {
  margin-top: 75px;
}

@media (max-width: 960px) {
  #service-platform {
    background: none;
    background-color: #e8e9fa;
  }
  #service-drive {
    background: none;
    background-color: #e3f9f0;
  }
  #service-bitflow {
    background: none;
    background-color: #ffe2b0;
  }
  #service-notes {
    background: none;
    background-color: #e3f9f0;
  }
  #service-contacts {
    background: none;
    background-color: #ffe2b0;
  }

  #main-section {
    height: calc(100vh - 56px);
    padding-top: 5vh;
  }
}
</style>
