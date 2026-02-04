from django.core.management.base import BaseCommand
from tracker.models import User, Team, Activity, Leaderboard, Workout
from django.utils import timezone


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create users (super heroes)
        users_data = [
            {'username': 'tony_stark', 'email': 'tony@marvel.com', 'first_name': 'Tony', 'last_name': 'Stark'},
            {'username': 'bruce_banner', 'email': 'bruce@marvel.com', 'first_name': 'Bruce', 'last_name': 'Banner'},
            {'username': 'steve_rogers', 'email': 'steve@marvel.com', 'first_name': 'Steve', 'last_name': 'Rogers'},
            {'username': 'clark_kent', 'email': 'clark@dc.com', 'first_name': 'Clark', 'last_name': 'Kent'},
            {'username': 'bruce_wayne', 'email': 'bruce@dc.com', 'first_name': 'Bruce', 'last_name': 'Wayne'},
            {'username': 'diana_prince', 'email': 'diana@dc.com', 'first_name': 'Diana', 'last_name': 'Prince'},
        ]
        users = []
        for data in users_data:
            user = User.objects.create_user(**data, password='password123')
            users.append(user)

        # Create teams
        marvel_team = Team.objects.create(name='Marvel')
        dc_team = Team.objects.create(name='DC')

        # Assign members
        marvel_team.members.set(users[:3])  # Tony, Bruce, Steve
        dc_team.members.set(users[3:])  # Clark, Bruce, Diana

        # Create activities
        activities_data = [
            {'user': users[0], 'activity_type': 'Running', 'duration': 30},
            {'user': users[1], 'activity_type': 'Weightlifting', 'duration': 45},
            {'user': users[2], 'activity_type': 'Swimming', 'duration': 60},
            {'user': users[3], 'activity_type': 'Flying', 'duration': 120},
            {'user': users[4], 'activity_type': 'Martial Arts', 'duration': 90},
            {'user': users[5], 'activity_type': 'Combat Training', 'duration': 75},
        ]
        for data in activities_data:
            Activity.objects.create(**data)

        # Create leaderboard
        Leaderboard.objects.create(team=marvel_team, score=150)
        Leaderboard.objects.create(team=dc_team, score=200)

        # Create workouts
        workouts_data = [
            {'user': users[0], 'name': 'Iron Man Workout', 'description': 'High-intensity training for superheroes'},
            {'user': users[1], 'name': 'Hulk Smash', 'description': 'Strength training'},
            {'user': users[2], 'name': 'Captain America Routine', 'description': 'Endurance and discipline'},
            {'user': users[3], 'name': 'Superman Flight Prep', 'description': 'Aerial exercises'},
            {'user': users[4], 'name': 'Batman Stealth Training', 'description': 'Agility and stealth'},
            {'user': users[5], 'name': 'Wonder Woman Combat', 'description': 'Warrior training'},
        ]
        for data in workouts_data:
            Workout.objects.create(**data)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data'))