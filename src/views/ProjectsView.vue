<script setup lang="ts">
import ExpandableProject from "@/components/ExpandableProject.vue";
import CodePill from "@/components/CodePill.vue";
import markeyImage from "@/assets/projects/markeyds.png";
import rummageCityImage from "@/assets/projects/rummagecity.png";
import tivoImage from "@/assets/projects/tivo.png";
import shutboxImage from "@/assets/projects/shutbox.png";
import taraMusicImage from "@/assets/projects/taramusic.png";
</script>

<template>
  <section class="projects-view">
    <v-container>
      <v-row class="text-center">
        <v-col>
          <h1 class="title-big">Projects</h1>
          <p>
            Putting in over 8 years of work means I <em>must</em> have done at
            least one thing to show-off. Turns out I do. Here's a shortlist of
            things that I'm proud off.
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="flex">
          <expandable-project title="Markey Digital Signage" url="https://my.markeyds.com" :techStack="[
              'Vue.js',
              'Vuetify',
              'PHP',
              'FatFree Framework',
              'MySQL',
              'HTML/CSS',
              'Google Maps API',
              'Google Calendar API',
              'Instagram API',
              'Open Weather API',
            ]" :image="markeyImage">
            <p>
              MarkeyDS is a project that I hold close to my heart. I didn't
              start the project, but I have taken the lead on it over the last 5
              years. This is a project that started without using a framework. I
              know right! It's silly to think now that that could ever be an
              option. Luckily, when I took over the conversion for the backend
              was already being put in place to use the
              <code-pill sm>Fatfree Framework</code-pill>
              . Unfortunately for me, the conversion wasn't complete and it fell
              onto me to complete. So after a whole bunch of solid coding sessions I was
              able finish what others had started. Then a few years later we
              decided to get really crazy and put the frontend into
              <code-pill sm>Vue.js</code-pill> 🎊. This was an incredibly
              challenging task that required a lot of thought of how to unwrap
              the tightly coupled frontend logic to make it more componentized.
              The conversion is ongoing, but it's in a really good spot where we
              can continue to add new features.
            </p>
          </expandable-project>

          <expandable-project title="Shutbox!" url="https://shutbox.michaeldahlke.com/" :image="shutboxImage"
            :techStack="['Vue.js']">
            <p>
              You know the classic dice game, right? If you don't, then please
              take a minute to
              <a href="https://shutbox.michaeldahlke.com/" target="_blank">play my virtual</a>
              version right now!<br />
              Okay, now that we're back from a little fun, let me tell you about
              it. This is a fun game that I decided to create out of boredom and
              wanting to create something with <code-pill sm>Vue.js</code-pill>.
              I had a blast programming this and I enjoy playing the game too!
              <br /><br />
              <small>Next project: move this into <code-pill sm>Vue 3</code-pill> 🤞
              </small>
            </p>
          </expandable-project>

          <expandable-project title="TiVo Google Assistant"
            url="https://www.wisnet.com/how-to-teach-google-assistant-to-talk-to-your-tivo/" :image="tivoImage"
            :techStack="['PHP', 'Telnet', 'Dialogflow']">
            <p>
              Back in the day before TiVo was "smart" and we had to create
              things by hand, TiVo didn't have a smart assistant companion. So,
              being a developer and nerdy enough to want to be able to talk to
              my TiVo instead of having to find the remote, I created one.
              <br /><br />
              <small>
                (I'm not sure if it works today because I don't have a TiVo
                anymore 😞)
              </small>
            </p>
          </expandable-project>

          <expandable-project title="Tara Dahlke Music" url="https://www.taradahlkemusic.com/" :image="taraMusicImage"
            :techStack="['Vue.js']">
            <p>
              Yup, this is one of my wife's websites. She loves playing the
              guitar and writing songs. Her family wanted to be able to hear her
              music but we weren't going to spend the money on a recording booth
              session. We didn't have professional
              <small>(or good)</small> recording equipment, but we did have a
              mic and a spare closet! <br /><br />
              Anyways, I wanted to make a site that could play her music and
              have a bio page. The only reason the bio page needed to be
              separate is because I wanted to make music be playable across site
              navigation. It was fun doing it and now I know that it's a really
              easy thing with these fancy new JS libraries/frameworks!
            </p>
          </expandable-project>

          <expandable-project title="Rummage City" url="https://www.rummagecity.com" :image="rummageCityImage"
            :techStack="['WordPress', 'Vue.js', 'PHP', 'Mapbox API']">
            <p>
              Rummage City has been in (once-in-awhile) development for 10
              years. This is a project that I started to do because I instantly
              fell in love with coding, but needed a purposeful project to keep
              learning about building websites. After many, many iterations and
              starting from scratch, this is where we are at with it now.
              <code-pill :sm="true">Vue.js</code-pill>
            </p>
          </expandable-project>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.title-big {
  font-size: vwclamp(60, 180);
  font-weight: bold;
  text-shadow: textShadow(#333);
  color: $red;
}
</style>