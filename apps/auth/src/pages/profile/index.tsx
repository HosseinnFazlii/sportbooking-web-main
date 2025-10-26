import Head from "next/head";
import { Grid, useAuth } from "@mf-core/core-ui";
import { useAllGroups } from "@mf-core/sportbooking-core";
import AboutOverivew from "../../views/profile/AboutOverivew";
import ActivityTimeline from "../../views/profile/ActivityTimeline";
import UserProfileHeader from "../../views/profile/UserProfileHeader";

export default function Profile() {
  const { user } = useAuth();
  const groups = useAllGroups();
  if (!user || !groups)
    return null;

  return (
    <Grid container spacing={6}>
      <Head>
        <title>کورتیک - پروفایل</title>
      </Head>
      <Grid item xs={12}>
        <UserProfileHeader user={user} />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xl={4} md={5} xs={12}>
            <AboutOverivew
              contacts={[
                { property: "موبایل", value: user.mobile.toString(), icon: "mdi:phone-outline" },
                { property: "ایمیل", value: user.email, icon: "mdi:email-outline" }
              ]}
              companies={[{ property: 'نام:', value: user.company ? user.company.name : "", icon: 'mdi:office-building', color: 'primary' },]}
              groups={groups.items.data.map((m) => (m.name))} />
          </Grid>
          <Grid item xl={8} md={7} xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <ActivityTimeline />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
